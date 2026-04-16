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

/**
 * @typedef Block
 * @type {object}
 * @property {Primary} primary
 * @property {string[]} secondary_list
 * @property {?string} text
 */

/**
 * @type {Block[]}
 */
const block_list = [
	// Εκ νεότητός μου
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'Εκ'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'νε'},
	{primary: PosotitaPrimary.oligon_kentima_dipla, secondary_list: [], text: 'ο'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'τη'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'τος'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'μου'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'ο'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'εχ'},
	{primary: Primary.vareia, secondary_list: [], text: null},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'θρο'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'ος'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'με'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'πει'},
	{primary: PosotitaPrimary.oligon_kentimata, secondary_list: [secondary_name.yfesi_monogrammi], text: 'ρα'},
	{primary: PosotitaPrimary.elafron, secondary_list: [], text: 'ζει'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'ταις'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'η'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'δο'},
	{primary: PosotitaPrimary.oligon_kentimata, secondary_list: [secondary_name.yfesi_apli, secondary_name.psifiston], text: 'ναις'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'φλε'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'γει'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'με'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'ε'},
	{primary: PosotitaPrimary.ison_petasti, secondary_list: [], text: 'γω'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'δε'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'πε'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'ποι'},
	{primary: PosotitaPrimary.oligon, secondary_list: [secondary_name.klasma], text: 'θως'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'εν'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'σοι'},
	{primary: PosotitaPrimary.apostrofos_petasti, secondary_list: [], text: 'Κυ'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'ρι'},
	{primary: PosotitaPrimary.syneches_elafron, secondary_list: [], text: 'ε'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'τρο'},
	{primary: PosotitaPrimary.oligon, secondary_list: [secondary_name.psifiston], text: 'που'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'μαι'},
	{primary: PosotitaPrimary.apostrofos_kentimata, secondary_list: [], text: 'του'},
	{primary: PosotitaPrimary.elafron, secondary_list: [secondary_name.klasma], text: 'τον'},
	{primary: MartyriaPrimary.martyria_ni, secondary_list: [secondary_name.martyriko_simadi_di], text: null},
	// Οι μισούντες Σιών
	{primary: PosotitaPrimary.oligon_kentima_dipla, secondary_list: [], text: 'Οι'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'μι'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.petasti, secondary_list: [], text: 'σου'},
	{primary: PosotitaPrimary.elafron, secondary_list: [], text: 'ντες'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'Σι'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.oligon, secondary_list: [secondary_name.klasma], text: 'ων'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'γε'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'νη'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'θη'},
	{primary: PosotitaPrimary.kentimata, secondary_list: [], text: 'η'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'τω'},
	{primary: PosotitaPrimary.elafron, secondary_list: [], text: 'σαν'},
	{primary: PosotitaPrimary.oligon, secondary_list: [secondary_name.klasma], text: 'δη'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'πριν'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'εκ'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'σπα'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.elafron_apostrofos, secondary_list: [], text: 'σθη'},
	{primary: PosotitaPrimary.kentimata, secondary_list: [], text: 'η'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'ναι'},
	{primary: PosotitaPrimary.elafron, secondary_list: [], text: 'ως'},
	{primary: PosotitaPrimary.oligon_kentimata, secondary_list: [], text: 'χορ'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.elafron, secondary_list: [secondary_name.klasma], text: 'τος'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'συγ'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.petasti, secondary_list: [], text: 'κο'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'ψει'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'γαρ'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'Χρι'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.oligon, secondary_list: [secondary_name.klasma], text: 'στος'},
	{primary: Primary.stavros, secondary_list: [], text: null},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'αυ'},
	{primary: Primary.diastoli, secondary_list: [], text: null},
	{primary: PosotitaPrimary.oligon_kentimata, secondary_list: [secondary_name.yfesi_monogrammi, secondary_name.gorgon], text: 'χε'}, // TODO gorgon
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'ε'},
	{primary: PosotitaPrimary.apostrofos, secondary_list: [], text: 'νας'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'αυ'},
	{primary: PosotitaPrimary.elafron_apostrofos, secondary_list: [], text: 'των'},
	{primary: PosotitaPrimary.oligon, secondary_list: [], text: 'το'},
	{primary: PosotitaPrimary.ison, secondary_list: [], text: 'μη'},
	{primary: PosotitaPrimary.elafron, secondary_list: [], text: 'βα'},
	{primary: PosotitaPrimary.oligon_kentimata, secondary_list: [], text: 'σα'},
	{primary: PosotitaPrimary.elafron, secondary_list: [secondary_name.klasma], text: 'νων'},
	{primary: MartyriaPrimary.martyria_ni, secondary_list: [secondary_name.martyriko_simadi_di], text: null},
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
	const block_div = document.createElement('div');
	block_div.classList.add('bz-block');
	const symbol_div = document.createElement('div');
	symbol_div.classList.add('bz-symbol');
	block_div.append(symbol_div);
	const primary_span = document.createElement('span');
	primary_span.classList.add(block.primary.font);
	if (block.primary.is_red())
		primary_span.classList.add(color_object.red);
	primary_span.innerHTML = block.primary.char;
	symbol_div.append(primary_span);
	symbol_div.append(...block.secondary_list.map(name => {
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
	if (block.text !== null) {
		const text_div = document.createElement('div');
		text_div.classList.add('bz-text');
		text_div.textContent = block.text;
		block_div.append(text_div);
	}
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
