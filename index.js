const Colors = {
	black: null,
	red: 'bz-red',
	blue: 'bz-blue',
};

/**
 * @typedef Char
 * @type {object}
 * @property {string} page
 * @property {string} key
 * @property {string} color
 */

const Pages = {
	byz: 'bz-byzantina',
	ison: 'bz-ison',
};

/**
 * @param {string} page
 * @param {string} key
 * @param {?string} color
 * @returns {Char}
 */
function char(page, key, color) {
	if (color === undefined)
		color = Colors.black;
	return {
		page: page,
		key: key,
		color: color,
	};
}

/**
 * @type {Map<string, Char>}
 */
const char_map = new Map([
	['vareia', char(Pages.byz, '\\')],
	['apostrofos', char(Pages.byz, 'j')],
	['kentimata', char(Pages.byz, 'x')],
	['oligon', char(Pages.byz, 's')],
	['klasma', char(Pages.byz, 'u')],
	['diastoli-kapelo', char(Pages.byz, '[')],
	['ison', char(Pages.byz, 'a')],
	['yphen', char(Pages.ison, 'z')],
	['diastoli-dipli', char(Pages.byz, 'p')],
	['ison-apostrofos', char(Pages.byz, '+')],
	['elafron', char(Pages.byz, 'k')],
	['kentima', char(Pages.byz, 'C')],
	['psifiston', char(Pages.byz, '/')],
	['oligon-petasti', char(Pages.byz, 'D')],
	['martyria-pa', char(Pages.byz, '1', Colors.red)],
	['simadi-protos', char(Pages.byz, '!', Colors.red)],
	['oligon-kentima-kato', char(Pages.byz, 'd')],
	['oligon-kentima-pano', char(Pages.byz, 'f')],
	['ichos', char(Pages.ison, '`', Colors.red)],
	['ichos-protos', char(Pages.ison, '1', Colors.red)],
	['ichos-simadi-protos', char(Pages.ison, '7', Colors.red)],
	['ichos-simadi-delta', char(Pages.ison, '-', Colors.red)],
	['ichos-pa', char(Pages.ison, '[', Colors.red)],
	['ison-ni', char(Pages.ison, 'd', Colors.blue)],
	['ison-pa', char(Pages.ison, 'f', Colors.blue)],
	['ison-di', char(Pages.ison, 'j', Colors.blue)],
	['ison-ni-akri', char(Pages.ison, 'D', Colors.blue)],
	['ison-pa-akri', char(Pages.ison, 'F', Colors.blue)],
	['ison-di-akri', char(Pages.ison, 'J', Colors.blue)],
]);

// TODO stick with previous
// TODO keep with previous
// TODO add space

/**
 * @typedef Box
 * @type {object}
 * @property {string} symbol
 * @property {?string} text
 */

/**
 * @param {string} symbol
 * @param {?string} text
 * @returns {Box}
 */
function box(symbol, text) {
	return {
		symbol: symbol,
		text: text !== undefined ? text : null,
	};
}

const score = [
	[
		box('ichos'),
		box('ichos-protos'),
		box('ichos-simadi-protos ichos-simadi-delta'),
		box('ichos-pa'),
	],
	[
		box('diastoli-dipli'),
		box('vareia'),
		box('apostrofos ison-ni-akri', 'Ο'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma ison-pa', 'λα'),
		box('ison yphen'),
		box('oligon', 'μα'),
		box('diastoli-dipli'),
		box('oligon', 'να'),
		box('oligon klasma', 'μ\'ο'),
		box('diastoli-kapelo'),
		box('vareia'),
		box('ison-apostrofos', 'λα'),
		box('elafron klasma'),
		box('diastoli-dipli'),
		box('oligon kentima', 'τα'),
		box('ison klasma yphen'),
		box('diastoli-kapelo'),
		box('oligon psifiston', 'κα'),
		box('apostrofos'),
		box('elafron klasma', 'στρα'),
		box('diastoli-dipli'),
		box('oligon-petasti ison-ni', 'χαι'),
		box('elafron klasma', 'ρο'),
		box('diastoli-kapelo'),
		box('ison klasma ison-pa', 'νται'),
		box('ison klasma yphen'),
		box('martyria-pa simadi-protos'),
		box('diastoli-dipli'),
	],
	[
		box('diastoli-dipli'),
		box('vareia'),
		box('oligon kentima ison-ni', 'κα'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma ison-pa', 'τα'),
		box('apostrofos', 'κα'),
		box('elafron', 'ϋ'),
		box('diastoli-dipli'),
		box('oligon-petasti', 'με'),
		box('elafron', 'νη'),
		box('oligon-kentima-kato'),
		box('diastoli-kapelo'),
		box('elafron klasma ison-ni', 'μα'),
		box('ison-apostrofos', 'να'),
		box('diastoli-dipli'),
		box('vareia'),
		box('oligon-kentima-pano', 'κι\'ο'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma', 'λα'),
		box('apostrofos', 'κα'),
		box('elafron'),
		box('diastoli-dipli'),
		box('oligon-petasti', 'νο'),
		box('elafron klasma', 'βο'),
		box('diastoli-kapelo'),
		box('ison klasma ison-pa', 'λου'),
		box('ison klasma', 'νε'),
		box('martyria-pa simadi-protos'),
		box('diastoli-dipli'),
	],
	[],
	[
		box('diastoli-dipli'),
		box('vareia'),
		box('apostrofos ison-ni-akri', 'Το'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma ison-pa', 'κα'),
		box('ison yphen'),
		box('oligon', 'μα'),
		box('diastoli-dipli'),
		box('oligon ison-di', 'να'),
		box('oligon klasma', 'μ\'το'),
		box('diastoli-kapelo'),
		box('vareia'),
		box('ison-apostrofos ison-pa-akri', 'κα'),
		box('elafron klasma'),
		box('diastoli-dipli'),
		box('oligon kentima ison-di', 'στρο'),
		box('ison klasma yphen'),
		box('diastoli-kapelo'),
		box('oligon psifiston', 'του'),
		box('apostrofos'),
		box('elafron klasma', 'Μι'),
		box('diastoli-dipli'),
		box('oligon-petasti ison-ni', 'σο'),
		box('elafron klasma', 'λο'),
		box('diastoli-kapelo'),
		box('ison klasma ison-pa', 'γγιου'),
		box('ison klasma yphen'),
		box('martyria-pa simadi-protos'),
		box('diastoli-dipli'),
	],
	[
		box('diastoli-dipli'),
		box('vareia'),
		box('oligon kentima ison-pa', 'κα'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma', 'τα'),
		box('apostrofos', 'κα'),
		box('elafron', 'ϋ'),
		box('diastoli-dipli'),
		box('oligon-petasti ison-ni', 'με'),
		box('elafron', 'νη'),
		box('oligon-kentima-kato'),
		box('diastoli-kapelo'),
		box('elafron klasma', 'μα'),
		box('ison-apostrofos', 'να'),
		box('diastoli-dipli'),
		box('vareia'),
		box('oligon-kentima-pano ison-di', 'στε'),
		box('apostrofos'),
		box('kentimata'),
		box('diastoli-kapelo'),
		box('oligon klasma', 'κε'),
		box('apostrofos', 'ται'),
		box('elafron'),
		box('diastoli-dipli'),
		box('oligon-petasti ison-ni', 'μα'),
		box('elafron klasma', 'ρα'),
		box('diastoli-kapelo'),
		box('ison klasma ison-pa', 'με'),
		box('ison klasma', 'νου'),
		box('martyria-pa simadi-protos'),
		box('diastoli-dipli'),
	],
];

const container = document.getElementById('container');
container.append(...score.map(paragraph => {
	const paragraph_elem = document.createElement('div');
	paragraph_elem.classList.add('bz-paragraph');
	paragraph_elem.append(...paragraph.map(box_obj => {
		const box_elem = document.createElement('div');
		box_elem.classList.add('bz-box');
		const music_elem = document.createElement('div');
		music_elem.classList.add('bz-symbol');
		// bz ison pushes symbols downwards by 8px
		const contains_ison = box_obj.symbol.split(' ').some(symbol => char_map.get(symbol).page === Pages.ison);
		if (contains_ison)
			music_elem.style.marginTop = '-8px';
		music_elem.append(...box_obj.symbol.split(' ').map(symbol => {
			const symbol_elem = document.createElement('div');
			const char = char_map.get(symbol);
			symbol_elem.classList.add(char.page);
			if (char.color !== null)
				symbol_elem.classList.add(char.color);
			symbol_elem.innerHTML = char.key;
			return symbol_elem;
		}));
		box_elem.append(music_elem);
		if (box_obj.text ?? null !== null) {
			const text_elem = document.createElement('div');
			text_elem.classList.add('bz-text');
			text_elem.innerHTML = box_obj.text;
			box_elem.append(text_elem);
		}
		return box_elem;
	}));
	return paragraph_elem;
}));
