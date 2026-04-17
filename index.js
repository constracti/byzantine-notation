const font_object = {
	byzantina: 'bz-byzantina',
	fthores: 'bz-fthores',
	ison: 'bz-ison',
};

const color_object = {
	black: null,
	red: 'bz-red',
};

/**
 * @param {string} font
 * @param {string} char
 * @returns {HTMLSpanElement}
 */
function custom_span(font, char) {
	const element = document.createElement('span');
	element.classList.add(font);
	element.innerHTML = char;
	return element;
}


class Primary {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {string}
	 */
	type;

	/**
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

	// TODO thick / thin, div, part

	static vareia = new Primary('vareia', 'kallopistikos', font_object.byzantina, '\\');
	static diastoli = new Primary('diastoli', 'metro', font_object.byzantina, 'o');
	static stavros = new Primary('stavros', 'metro', font_object.fthores, '\''); // TODO type

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, type, font, char) {
		this.name = name;
		this.type = type;
		this.font = font;
		this.char = char;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return this === Primary.stavros;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const primary_span = document.createElement('span');
		primary_span.classList.add(this.font);
		if (this.is_red())
			primary_span.classList.add(color_object.red);
		primary_span.innerHTML = this.char;
		return primary_span;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @param {Block[]} block_list
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index, block_list) {
		return null;
	}
}


class PosotitaPrimary extends Primary {

	/**
	 * @type {number[]}
	 */
	move_list;

	static type = 'posotita';

	static ison = new PosotitaPrimary('ison', [0], font_object.byzantina, 'a');
	static ison_petasti = new PosotitaPrimary('ison-petasti', [0], font_object.byzantina, 'A');
	static oligon = new PosotitaPrimary('oligon', [+1], font_object.byzantina, 's');
	static petasti = new PosotitaPrimary('petasti', [+1], font_object.byzantina, 'S');
	static kentimata = new PosotitaPrimary('kentimata', [+1], font_object.byzantina, 'x');
	// static oligon_kentima_kato = new PosotitaPrimary('oligon-kentima-kato', [+2], font_object.byzantina, 'd');
	static oligon_kentimata = new PosotitaPrimary('oligon-kentimata', [+1, +1], font_object.byzantina, 'v');
	static oligon_kentima_dipla = new PosotitaPrimary('oligon-kentima-dipla', [+2], font_object.byzantina, 'sC');
	static apostrofos = new PosotitaPrimary('apostrofos', [-1], font_object.byzantina, 'j');
	static apostrofos_petasti = new PosotitaPrimary('apostrofos-petasti', [-1], font_object.byzantina, 'J');
	static elafron = new PosotitaPrimary('elafron', [-2], font_object.byzantina, 'k');
	static elafron_apostrofos = new PosotitaPrimary('elafron-apostrofos', [-3], font_object.byzantina, 'l');
	static syneches_elafron = new PosotitaPrimary('syneches-elafron', [-1, -1], font_object.byzantina, 'h');
	// TODO center text below syneches elafron
	static apostrofos_kentimata = new PosotitaPrimary('apostrofos-kentimata', [-1, +1], font_object.byzantina, '-');

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, move_list, font, char) {
		super(name, PosotitaPrimary.type, font, char);
		this.move_list = move_list;
	}

	/**
	 * @returns {boolean}
	 */
	starts_with_syneches_elafron() {
		return this === PosotitaPrimary.syneches_elafron; // TODO also symploki
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return false;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @param {Block[]} block_list
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index, block_list) {
		const block = block_list[block_index];
		/**
		 * @type {Part[]}
		 */
		const part_list = [];
		this.move_list.forEach(move => {
			music_context.pitch += move;
			part_list.push({
				pitch: music_context.pitch,
				steps: 0,
				duration: 1,
				block: block_index,
			});
		});
		// TODO duration from previous gorgon
		// duration from current syneches elafron
		if (this.starts_with_syneches_elafron()) {
			if (part_list.length >= 1) // condition must be true
				part_list[0].duration -= 1 / 2;
		}
		// duration from current gorgon
		if (block.gorgon !== null) {
			if (part_list.length >= 2)
				part_list[part_list.length - 2].duration -= 1 - 1 / block.gorgon.tuplet;
			if (part_list.length >= 1) // condition must be true
				part_list[part_list.length - 1].duration -= 1 - 1 / block.gorgon.tuplet;
			// TODO next parts
		}
		// duration from next gorgon or syneches elafron
		const tuplet = this.#is_followed_by_gorgon(block_index, block_list);
		if (tuplet !== null) {
			if (part_list.length >= 1) // condition must be true
				part_list[part_list.length - 1].duration -= 1 - 1 / tuplet;
		}
		// chronos & alloiosi // TODO maybe on secondary subclasses
		block.secondary_list.forEach(secondary => {
			switch (secondary.type) {
				case AlloiosiSecondary.type:
					/**
					 * @type {AlloiosiSecondary}
					 */
					const alloiosi = secondary;
					if (part_list.length >= 1) // condition must be true
						part_list[part_list.length - 1].steps = alloiosi.steps;
					break;
				case ChronosSecondary.type:
					/**
					 * @type {ChronosSecondary}
					 */
					const chronos = secondary;
					if (part_list.length >= 1) // condition must be true
						part_list[part_list.length - 1].duration += chronos.beats;
					break;
			}
		});
		// return
		return part_list;
	}

	/**
	 * @param {number} block_index
	 * @param {Block[]} block_list
	 * @returns {?number} tuplet or null
	 */
	#is_followed_by_gorgon(block_index, block_list) {
		while (true) {
			block_index++;
			if (block_index === block_list.length)
				return null;
			const block = block_list[block_index];
			switch (block.primary.type) {
				case PosotitaPrimary.type:
					/**
					 * @type {PosotitaPrimary}
					 */
					const posotita = block.primary;
					if (posotita.starts_with_syneches_elafron())
						return 2;
					if (posotita.move_list.length >= 2)
						return null;
					if (block.gorgon === null)
						return null;
					return block.gorgon.tuplet;
				// TODO siopi
				default:
					continue;
			}
		}
	}
}


class MartyriaPrimary extends Primary {

	static type = 'martyria';

	static martyria_ni = new MartyriaPrimary('martyria-ni', '7');

	/**
	 * @param {string} name
	 * @param {string} char
	 */
	constructor(name, char) {
		super(name, MartyriaPrimary.type, font_object.byzantina, char);
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
	}
}


class Secondary {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {string}
	 */
	type;

	/**
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

	static martyriko_simadi = 'martyriko-simadi';

	static psifiston = new Secondary('psifiston', 'kallopistikos', font_object.byzantina, '/');
	static martyriko_simadi_di = new Secondary('martyriko_simadi_di', Secondary.martyriko_simadi, font_object.byzantina, '&');

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, type, font, char) {
		this.name = name;
		this.type = type;
		this.font = font;
		this.char = char;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return this.type === Secondary.martyriko_simadi;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const secondary_span = document.createElement('span');
		secondary_span.classList.add(this.font);
		if (this.is_red())
			secondary_span.classList.add(color_object.red);
		secondary_span.innerHTML = this.char;
		return secondary_span;
	}
}


class ChronosSecondary extends Secondary {

	/**
	 * @type {number}
	 */
	beats;

	static type = 'chronos';

	static klasma = new ChronosSecondary('klasma', 1, font_object.byzantina, 'u');

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, beats, font, char) {
		super(name, ChronosSecondary.type, font, char);
		this.beats = beats;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return false;
	}
}

class GorgonSecondary extends Secondary {

	/**
	 * @type {number}
	 */
	tuplet;

	static type = 'gorgon';

	static gorgon = new GorgonSecondary('gorgon', 2, font_object.byzantina, 'r');

	/**
	 * @param {string} name
	 * @param {number} tuplet
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, tuplet, font, char) {
		super(name, GorgonSecondary.type, font, char);
		this.tuplet = tuplet;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return false;
	}
}


class AlloiosiSecondary extends Secondary {

	/**
	 * @type {number}
	 */
	steps;

	static type = 'alloiosi';

	static yfesi_apli = new AlloiosiSecondary('yfesi_apli', -2, font_object.byzantina, 'y');
	static yfesi_monogrammi = new AlloiosiSecondary('yfesi_monogrammi', -4, font_object.byzantina, 'Y');

	/**
	 * @param {string} name
	 * @param {number} steps
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, steps, font, char) {
		super(name, AlloiosiSecondary.type, font, char);
		this.steps = steps;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
	}
}


class Block {

	/**
	 * @type {Primary}
	 */
	primary;

	/**
	 * @type {?GorgonSecondary}
	 */
	gorgon;

	/**
	 * @type {Secondary[]}
	 */
	secondary_list;

	/**
	 * @type {?string}
	 */
	text;

	/**
	 * @param {Primary} primary
	 * @param {?GorgonSecondary} gorgon 
	 * @param {Secondary[]} secondary_list
	 * @param {?string} text
	 */
	constructor(primary, gorgon, secondary_list, text) {
		this.primary = primary;
		this.gorgon = gorgon;
		this.secondary_list = secondary_list;
		this.text = text;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = document.createElement('div');
		block_div.classList.add('bz-block');
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		block_div.append(symbol_div);
		if (this.primary === PosotitaPrimary.oligon_kentimata && this.gorgon === GorgonSecondary.gorgon) {
			symbol_div.append(custom_span(font_object.byzantina, 'V'));
		} else {
			symbol_div.append(this.primary.get_span());
			if (this.gorgon !== null)
				symbol_div.append(this.gorgon.get_span());
		}
		symbol_div.append(...this.secondary_list.map(secondary => secondary.get_span()));
		if (this.text !== null) {
			const text_div = document.createElement('div');
			text_div.classList.add('bz-text');
			text_div.textContent = this.text;
			block_div.append(text_div);
		}
		return block_div;
	}
}


const block_list = [
	// Εκ νεότητός μου
	new Block(PosotitaPrimary.ison, null, [], 'Εκ'),
	new Block(PosotitaPrimary.ison, null, [], 'νε'),
	new Block(PosotitaPrimary.oligon_kentima_dipla, null, [], 'ο'),
	new Block(PosotitaPrimary.oligon, null, [], 'τη'),
	new Block(PosotitaPrimary.oligon, null, [], 'τος'),
	new Block(PosotitaPrimary.ison, null, [], 'μου'),
	new Block(PosotitaPrimary.ison, null, [], 'ο'),
	new Block(PosotitaPrimary.ison, null, [], 'εχ'),
	new Block(Primary.vareia, null, [], null),
	new Block(PosotitaPrimary.apostrofos, null, [], 'θρο'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'ος'),
	new Block(PosotitaPrimary.oligon, null, [], 'με'),
	new Block(PosotitaPrimary.oligon, null, [], 'πει'),
	new Block(PosotitaPrimary.oligon_kentimata, null, [AlloiosiSecondary.yfesi_monogrammi], 'ρα'),
	new Block(PosotitaPrimary.elafron, null, [], 'ζει'),
	new Block(PosotitaPrimary.ison, null, [], 'ταις'),
	new Block(PosotitaPrimary.ison, null, [], 'η'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'δο'),
	new Block(PosotitaPrimary.oligon_kentimata, null, [AlloiosiSecondary.yfesi_apli, Secondary.psifiston], 'ναις'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'φλε'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'γει'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'με'),
	new Block(PosotitaPrimary.ison, null, [], 'ε'),
	new Block(PosotitaPrimary.ison_petasti, null, [], 'γω'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'δε'),
	new Block(PosotitaPrimary.oligon, null, [], 'πε'),
	new Block(PosotitaPrimary.oligon, null, [], 'ποι'),
	new Block(PosotitaPrimary.oligon, null, [ChronosSecondary.klasma], 'θως'),
	new Block(PosotitaPrimary.ison, null, [], 'εν'),
	new Block(PosotitaPrimary.oligon, null, [], 'σοι'),
	new Block(PosotitaPrimary.apostrofos_petasti, null, [], 'Κυ'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'ρι'),
	new Block(PosotitaPrimary.syneches_elafron, null, [], 'ε'),
	new Block(PosotitaPrimary.oligon, null, [], 'τρο'),
	new Block(PosotitaPrimary.oligon, null, [Secondary.psifiston], 'που'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'μαι'),
	new Block(PosotitaPrimary.apostrofos_kentimata, null, [], 'του'),
	new Block(PosotitaPrimary.elafron, null, [ChronosSecondary.klasma], 'τον'),
	new Block(MartyriaPrimary.martyria_ni, null, [Secondary.martyriko_simadi_di], null),
	// Οι μισούντες Σιών
	new Block(PosotitaPrimary.oligon_kentima_dipla, null, [], 'Οι'),
	new Block(PosotitaPrimary.oligon, null, [], 'μι'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.petasti, null, [], 'σου'),
	new Block(PosotitaPrimary.elafron, null, [], 'ντες'),
	new Block(PosotitaPrimary.oligon, null, [], 'Σι'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.oligon, null, [ChronosSecondary.klasma], 'ων'),
	new Block(PosotitaPrimary.ison, null, [], 'γε'),
	new Block(PosotitaPrimary.ison, null, [], 'νη'),
	new Block(PosotitaPrimary.ison, null, [], 'θη'),
	new Block(PosotitaPrimary.kentimata, null, [], 'η'),
	new Block(PosotitaPrimary.ison, null, [], 'τω'),
	new Block(PosotitaPrimary.elafron, null, [], 'σαν'),
	new Block(PosotitaPrimary.oligon, null, [ChronosSecondary.klasma], 'δη'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.ison, null, [], 'πριν'),
	new Block(PosotitaPrimary.ison, null, [], 'εκ'),
	new Block(PosotitaPrimary.ison, null, [], 'σπα'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.elafron_apostrofos, null, [], 'σθη'),
	new Block(PosotitaPrimary.kentimata, null, [], 'η'),
	new Block(PosotitaPrimary.ison, null, [], 'ναι'),
	new Block(PosotitaPrimary.elafron, null, [], 'ως'),
	new Block(PosotitaPrimary.oligon_kentimata, null, [], 'χορ'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.elafron, null, [ChronosSecondary.klasma], 'τος'),
	new Block(PosotitaPrimary.oligon, null, [], 'συγ'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.petasti, null, [], 'κο'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'ψει'),
	new Block(PosotitaPrimary.oligon, null, [], 'γαρ'),
	new Block(PosotitaPrimary.oligon, null, [], 'Χρι'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.oligon, null, [ChronosSecondary.klasma], 'στος'),
	new Block(Primary.stavros, null, [], null),
	new Block(PosotitaPrimary.ison, null, [], 'αυ'),
	new Block(Primary.diastoli, null, [], null),
	new Block(PosotitaPrimary.oligon_kentimata, GorgonSecondary.gorgon, [AlloiosiSecondary.yfesi_monogrammi], 'χε'), // TODO gorgon
	new Block(PosotitaPrimary.apostrofos, null, [], 'ε'),
	new Block(PosotitaPrimary.apostrofos, null, [], 'νας'),
	new Block(PosotitaPrimary.ison, null, [], 'αυ'),
	new Block(PosotitaPrimary.elafron_apostrofos, null, [], 'των'),
	new Block(PosotitaPrimary.oligon, null, [], 'το'),
	new Block(PosotitaPrimary.ison, null, [], 'μη'),
	new Block(PosotitaPrimary.elafron, null, [], 'βα'),
	new Block(PosotitaPrimary.oligon_kentimata, null, [], 'σα'),
	new Block(PosotitaPrimary.elafron, null, [ChronosSecondary.klasma], 'νων'),
	new Block(MartyriaPrimary.martyria_ni, null, [Secondary.martyriko_simadi_di], null),
];

/**
 * @typedef Part
 * @type {object}
 * @property {number} pitch
 * @property {number} steps
 * @property {number} duration
 * @property {number} block
 */

/**
 * map block index to part index
 * @type {Map<number, number}
 */
const part_map = new Map();

/**
 * @typedef MusicContext TODO include scale
 * @type {object}
 * @property {number} pitch
 */

/**
 * @type {MusicContext}
 */
const music_context = {
	pitch: 0,
};

/**
 * @type {Part[]}
 */
const part_list = [];
block_list.forEach((block, block_index, block_list) => {
	const part_list_of_block = block.primary.get_parts(music_context, block_index, block_list);
	if (part_list_of_block === null)
		return;
	part_map.set(block_index, part_list.length);
	part_list.push(...part_list_of_block);
});

/**
 * @type {HTMLDivElement}
 */
const container_div = document.getElementById('container-div');

container_div.append(...block_list.map((block, block_index) => {
	const block_div = block.get_div();
	const part_index = part_map.get(block_index);
	if (part_index !== undefined) {
		block_div.classList.add('bz-pointer');
		block_div.addEventListener('click', () => {
			play(part_index);
		});
	}
	return block_div;
}));

const note_name_list = ['νη', 'πα', 'βου', 'γα', 'δι', 'κε', 'ζω'];
const scale = [12, 10, 8, 12, 12, 10, 8];
if (scale.reduce((acc, cur) => acc + cur, 0) !== 72)
	throw new Error('scale sum is not 72');
const partial = scale.map((cur, ind, arr) => arr.slice(0, ind).reduce((acc, cur) => acc + cur, 0));

const audio_context = new AudioContext();

/**
 * @param {number} index part
 */
function play(index) {
	if (index === part_list.length)
		return;
	const part = part_list[index];
	const octave = Math.floor(part.pitch / 7);
	const note = part.pitch - octave * 7;
	const oscillator_node = new OscillatorNode(audio_context, {
		frequency: 440 * Math.pow(2, octave + (partial[note] - partial[5] + part.steps) / 72),
		type: 'triangle', // TODO simulate musical instrument
	});
	const block_div = container_div.children[part.block];
	block_div.classList.add('bz-active');
	oscillator_node.connect(audio_context.destination);
	oscillator_node.start();
	setTimeout(() => {
		block_div.classList.remove('bz-active');
		oscillator_node.stop();
		play(index + 1);
	}, 300 * part.duration);
}
