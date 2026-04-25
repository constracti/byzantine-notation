import { Glyph } from './glyph.js';


export class MartyrikoSimadi {

	/**
	 * @type {string}
	 */
	name; // TODO martyriko simadi names

	/**
	 * @type {Glyph}
	 */
	glyph;

	static protos = new MartyrikoSimadi('protos', new Glyph(Glyph.font_byzantina, '!'));
	static nana = new MartyrikoSimadi('nana', new Glyph(Glyph.font_byzantina, '#'));
	static varys = new MartyrikoSimadi('varys', new Glyph(Glyph.font_byzantina, '^'));
	static delta = new MartyrikoSimadi('delta', new Glyph(Glyph.font_byzantina, '&'));

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 */
	constructor(name, glyph) {
		this.name = name;
		this.glyph = glyph;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = this.glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
