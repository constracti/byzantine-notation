const font_object = {
	byzantina: 'bz-byzantina',
	fthores: 'bz-fthores',
	ison: 'bz-ison',
};

const color_object = {
	black: null,
	red: 'bz-red',
};


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

	static type = 'extra';

	static vareia = new Primary('vareia', Primary.type, font_object.byzantina, '\\');
	static diastoli = new Primary('diastoli', Primary.type, font_object.byzantina, 'o');
	static stavros = new Primary('stavros', Primary.type, font_object.fthores, '\'');

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
	static oligon_kentima_kato = new PosotitaPrimary('oligon-kentima-kato', [+2], font_object.byzantina, 'd');
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
		return this === PosotitaPrimary.syneches_elafron;
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


/**
 * @typedef Secondary
 * @type {object}
 * @property {string} name
 * @property {string} type
 * @property {?number} action
 * @property {string} font
 * @property {string} char
 */

const secondary_name = {
	yfesi_apli: 'yfesi-apli',
	yfesi_monogrammi: 'yfesi-monogrammi',
	klasma: 'klasma',
	gorgon: 'gorgon',
	psifiston: 'psifiston',
	martyriko_simadi_di: 'martyriko-simadi-di',
};

const secondary_type = {
	alloiosi: 'alloiosi',
	chronos: 'chronos',
	diairon: 'diairon',
	kallopismos: 'kallopismos',
	martyriko_simadi: 'martyriko-simadi',
};

/**
 * @type {Secondary[]}
 */
const secondary_list = [
	{
		name: secondary_name.yfesi_apli,
		type: secondary_type.alloiosi,
		action: -2,
		font: font_object.byzantina,
		char: 'y',
	},
	{
		name: secondary_name.yfesi_monogrammi,
		type: secondary_type.alloiosi,
		action: -4,
		font: font_object.byzantina,
		char: 'Y',
	},
	{
		name: secondary_name.klasma,
		type: secondary_type.chronos,
		action: 1,
		font: font_object.byzantina,
		char: 'u',
	},
	{
		name: secondary_name.gorgon,
		type: secondary_type.diairon,
		action: 2,
		font: font_object.byzantina,
		char: 'r',
	},
	{
		name: secondary_name.psifiston,
		type: secondary_type.kallopismos,
		action: null,
		font: font_object.byzantina,
		char: '/',
	},
	{
		name: secondary_name.martyriko_simadi_di,
		type: secondary_type.martyriko_simadi,
		action: null,
		font: font_object.byzantina,
		char: '&',
	},
];
const secondary_map = new Map(secondary_list.map(secondary => [secondary.name, secondary]));


class Block {

	/**
	 * @type {Primary}
	 */
	primary;

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
	 * @param {Secondary[]} secondary_list
	 * @param {?string} text
	 */
	constructor(primary, secondary_list, text) {
		this.primary = primary;
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
		symbol_div.append(this.primary.get_span());
		symbol_div.append(...this.secondary_list.map(name => {
			const secondary = secondary_map.get(name);
			if (secondary === undefined)
				throw new Error(`secondary ${name} not found`);
			const secondary_span = document.createElement('span');
			secondary_span.classList.add(secondary.font);
			if (new Set([secondary_type.alloiosi, secondary_type.martyriko_simadi]).has(secondary.type))
				secondary_span.classList.add(color_object.red);
			secondary_span.innerHTML = secondary.char;
			return secondary_span;
		}));
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
	new Block(PosotitaPrimary.ison, [], 'Εκ'),
	new Block(PosotitaPrimary.ison, [], 'νε'),
	new Block(PosotitaPrimary.oligon_kentima_dipla, [], 'ο'),
	new Block(PosotitaPrimary.oligon, [], 'τη'),
	new Block(PosotitaPrimary.oligon, [], 'τος'),
	new Block(PosotitaPrimary.ison, [], 'μου'),
	new Block(PosotitaPrimary.ison, [], 'ο'),
	new Block(PosotitaPrimary.ison, [], 'εχ'),
	new Block(Primary.vareia, [], null),
	new Block(PosotitaPrimary.apostrofos, [], 'θρο'),
	new Block(PosotitaPrimary.apostrofos, [], 'ος'),
	new Block(PosotitaPrimary.oligon, [], 'με'),
	new Block(PosotitaPrimary.oligon, [], 'πει'),
	new Block(PosotitaPrimary.oligon_kentimata, [secondary_name.yfesi_monogrammi], 'ρα'),
	new Block(PosotitaPrimary.elafron, [], 'ζει'),
	new Block(PosotitaPrimary.ison, [], 'ταις'),
	new Block(PosotitaPrimary.ison, [], 'η'),
	new Block(PosotitaPrimary.apostrofos, [], 'δο'),
	new Block(PosotitaPrimary.oligon_kentimata, [secondary_name.yfesi_apli, secondary_name.psifiston], 'ναις'),
	new Block(PosotitaPrimary.apostrofos, [], 'φλε'),
	new Block(PosotitaPrimary.apostrofos, [], 'γει'),
	new Block(PosotitaPrimary.apostrofos, [], 'με'),
	new Block(PosotitaPrimary.ison, [], 'ε'),
	new Block(PosotitaPrimary.ison_petasti, [], 'γω'),
	new Block(PosotitaPrimary.apostrofos, [], 'δε'),
	new Block(PosotitaPrimary.oligon, [], 'πε'),
	new Block(PosotitaPrimary.oligon, [], 'ποι'),
	new Block(PosotitaPrimary.oligon, [secondary_name.klasma], 'θως'),
	new Block(PosotitaPrimary.ison, [], 'εν'),
	new Block(PosotitaPrimary.oligon, [], 'σοι'),
	new Block(PosotitaPrimary.apostrofos_petasti, [], 'Κυ'),
	new Block(PosotitaPrimary.apostrofos, [], 'ρι'),
	new Block(PosotitaPrimary.syneches_elafron, [], 'ε'),
	new Block(PosotitaPrimary.oligon, [], 'τρο'),
	new Block(PosotitaPrimary.oligon, [secondary_name.psifiston], 'που'),
	new Block(PosotitaPrimary.apostrofos, [], 'μαι'),
	new Block(PosotitaPrimary.apostrofos_kentimata, [], 'του'),
	new Block(PosotitaPrimary.elafron, [secondary_name.klasma], 'τον'),
	new Block(MartyriaPrimary.martyria_ni, [secondary_name.martyriko_simadi_di], null),
	// Οι μισούντες Σιών
	new Block(PosotitaPrimary.oligon_kentima_dipla, [], 'Οι'),
	new Block(PosotitaPrimary.oligon, [], 'μι'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.petasti, [], 'σου'),
	new Block(PosotitaPrimary.elafron, [], 'ντες'),
	new Block(PosotitaPrimary.oligon, [], 'Σι'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.oligon, [secondary_name.klasma], 'ων'),
	new Block(PosotitaPrimary.ison, [], 'γε'),
	new Block(PosotitaPrimary.ison, [], 'νη'),
	new Block(PosotitaPrimary.ison, [], 'θη'),
	new Block(PosotitaPrimary.kentimata, [], 'η'),
	new Block(PosotitaPrimary.ison, [], 'τω'),
	new Block(PosotitaPrimary.elafron, [], 'σαν'),
	new Block(PosotitaPrimary.oligon, [secondary_name.klasma], 'δη'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.ison, [], 'πριν'),
	new Block(PosotitaPrimary.ison, [], 'εκ'),
	new Block(PosotitaPrimary.ison, [], 'σπα'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.elafron_apostrofos, [], 'σθη'),
	new Block(PosotitaPrimary.kentimata, [], 'η'),
	new Block(PosotitaPrimary.ison, [], 'ναι'),
	new Block(PosotitaPrimary.elafron, [], 'ως'),
	new Block(PosotitaPrimary.oligon_kentimata, [], 'χορ'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.elafron, [secondary_name.klasma], 'τος'),
	new Block(PosotitaPrimary.oligon, [], 'συγ'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.petasti, [], 'κο'),
	new Block(PosotitaPrimary.apostrofos, [], 'ψει'),
	new Block(PosotitaPrimary.oligon, [], 'γαρ'),
	new Block(PosotitaPrimary.oligon, [], 'Χρι'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.oligon, [secondary_name.klasma], 'στος'),
	new Block(Primary.stavros, [], null),
	new Block(PosotitaPrimary.ison, [], 'αυ'),
	new Block(Primary.diastoli, [], null),
	new Block(PosotitaPrimary.oligon_kentimata, [secondary_name.yfesi_monogrammi, secondary_name.gorgon], 'χε'), // TODO gorgon
	new Block(PosotitaPrimary.apostrofos, [], 'ε'),
	new Block(PosotitaPrimary.apostrofos, [], 'νας'),
	new Block(PosotitaPrimary.ison, [], 'αυ'),
	new Block(PosotitaPrimary.elafron_apostrofos, [], 'των'),
	new Block(PosotitaPrimary.oligon, [], 'το'),
	new Block(PosotitaPrimary.ison, [], 'μη'),
	new Block(PosotitaPrimary.elafron, [], 'βα'),
	new Block(PosotitaPrimary.oligon_kentimata, [], 'σα'),
	new Block(PosotitaPrimary.elafron, [secondary_name.klasma], 'νων'),
	new Block(MartyriaPrimary.martyria_ni, [secondary_name.martyriko_simadi_di], null),
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
 * @type {Map<number, Part}
 */
const part_map = new Map();

/**
 * @param {Block[]} block_list
 * @param {number} block_index
 */
function block_sees_syneches_elafron(block_list, block_index) {
	while (true) {
		block_index++;
		if (block_index === block_list.length)
			return false;
		const block = block_list[block_index];
		if (block.primary.type !== PosotitaPrimary.type)
			continue;
		/**
		 * @type {PosotitaPrimary}
		 */
		const primary = block.primary;
		return primary.starts_with_syneches_elafron();
	}
}

/**
 * @type {Part[]}
 */
const part_list = [];
block_list.forEach((block, block_index, block_list) => {
	const secondary_list = block.secondary_list.map(name => {
		const secondary = secondary_map.get(name);
		if (secondary === undefined)
			throw new Error(`secondary ${name} not found`);
		return secondary;
	});
	switch (block.primary.type) {
		case PosotitaPrimary.type:
			/**
			 * @type {PosotitaPrimary}
			 */
			const primary = block.primary;
			primary.move_list.forEach((move, move_index, move_list) => {
				part_list.push({
					pitch: (part_list.length > 0 ? part_list[part_list.length - 1].pitch : 0) + move,
					steps: 0,
					duration: primary.starts_with_syneches_elafron() && move_index === 0 || block_sees_syneches_elafron(block_list, block_index) && move_index === move_list.length - 1 ? 0.5 : 1,
					block: block_index,
				});
				if (!part_map.has(block_index))
					part_map.set(block_index, part_list.length - 1);
			});
			break;
		// TODO siopi
	}
	secondary_list.forEach(secondary => {
		switch (secondary.type) {
			case secondary_type.alloiosi:
				part_list[part_list.length - 1].steps = secondary.action;
				break;
			case secondary_type.chronos:
				part_list[part_list.length - 1].duration += secondary.action;
				break;
		}
	});
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

const audioContext = new AudioContext();

/**
 * @param {number} index part
 */
function play(index) {
	if (index === part_list.length)
		return;
	const part = part_list[index];
	const octave = Math.floor(part.pitch / 7);
	const note = part.pitch - octave * 7;
	const oscillatorNode = new OscillatorNode(audioContext, {
		frequency: 440 * Math.pow(2, octave + (partial[note] - partial[5] + part.steps) / 72),
		type: 'triangle', // TODO simulate musical instrument
	});
	const block_div = container_div.children[part.block];
	block_div.classList.add('bz-active');
	oscillatorNode.connect(audioContext.destination);
	oscillatorNode.start();
	setTimeout(() => {
		block_div.classList.remove('bz-active');
		oscillatorNode.stop();
		play(index + 1);
	}, 300 * part.duration);
}
