import { Glyph } from './glyph.js';


export class Ichos {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Glyph[]}
	 */
	glyph_list;

	static #glyph_ichos = new Glyph(Glyph.font_ison, '`');
	static #glyph_plagios = new Glyph(Glyph.font_ison, '~');

	static protos = new Ichos('protos', [new Glyph(Glyph.font_ison, '&')]);
	static defteros = new Ichos('defteros', [new Glyph(Glyph.font_ison, '*')]);
	static tritos = new Ichos('tritos', [new Glyph(Glyph.font_ison, ')')]);
	static tetartos = new Ichos('tetartos', [new Glyph(Glyph.font_ison, '^')]);
	static plagios_protos = new Ichos('plagios-protos', [Ichos.#glyph_plagios, new Glyph(Glyph.font_ison, '7')]);
	static plagios_defteros = new Ichos('plagios-defteros', [Ichos.#glyph_plagios, new Glyph(Glyph.font_ison, '8')]);
	static varys = new Ichos('varys', [new Glyph(Glyph.font_ison, '(')]);
	static plagios_tetartos = new Ichos('plagios-tetartos', [Ichos.#glyph_plagios, new Glyph(Glyph.font_ison, '6')]);

	/**
	 * @param {string} name
	 * @param {Glyph[]} glyph_list
	 */
	constructor(name, glyph_list) {
		this.name = name;
		this.glyph_list = glyph_list;
	}

	/**
	 * @returns {HTMLSpanElement[]}
	 */
	get_span_list() {
		/**
		 * @type {HTMLSpanElement[]}
		 */
		const span_list = [];
		// ichos
		const span = Ichos.#glyph_ichos.get_span();
		span.classList.add(Glyph.color_red);
		span_list.push(span);
		// rest
		this.glyph_list.forEach(glyph => {
			const span = glyph.get_span();
			span.classList.add(Glyph.color_red);
			span_list.push(span);
		});
		// return
		return span_list;
	}
}
