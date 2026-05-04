import { Glyph } from './glyph.js';


export class MartyrikoSimadi {

	/**
	 * @type {string}
	 */
	name; // TODO martyriko simadi names

	/**
	 * @type {Glyph}
	 */
	#glyph;

	/**
	 * @type {boolean}
	 */
	teleies;

	static protos = new MartyrikoSimadi('protos', new Glyph(Glyph.font_byzantina, '!'), false);
	static protos_teleies = new MartyrikoSimadi('protos-teleies', new Glyph(Glyph.font_byzantina, '!'), true);
	static nana = new MartyrikoSimadi('nana', new Glyph(Glyph.font_byzantina, '#'), false);
	static varys = new MartyrikoSimadi('varys', new Glyph(Glyph.font_byzantina, '^'), false);
	static delta = new MartyrikoSimadi('delta', new Glyph(Glyph.font_byzantina, '&'), false);
	static delta_teleies = new MartyrikoSimadi('delta-teleies', new Glyph(Glyph.font_byzantina, '&'), true);
	static skliro = new MartyrikoSimadi('skliro', new Glyph(Glyph.font_byzantina, '$'), false);
	static defteros = new MartyrikoSimadi('defteros', new Glyph(Glyph.font_byzantina, '%'), false);
	static defteros_teleies = new MartyrikoSimadi('defteros-teleies', new Glyph(Glyph.font_byzantina, '%'), true);

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 * @param {boolean} teleies
	 */
	constructor(name, glyph, teleies) {
		this.name = name;
		this.#glyph = glyph;
		this.teleies = teleies;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = this.#glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
