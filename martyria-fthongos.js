import { Glyph } from './glyph.js';


export class MartyriaFthongos {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {number} 0 for ni, 1 for pa, ..., 6 for zo
	 */
	note;

	/**
	 * @type {Glyph}
	 */
	glyph;

	static ni = new MartyriaFthongos('ni', 0, new Glyph(Glyph.font_byzantina, '7'));
	static pa = new MartyriaFthongos('pa', 1, new Glyph(Glyph.font_byzantina, '1'));
	static vou = new MartyriaFthongos('vou', 2, new Glyph(Glyph.font_byzantina, '2'));
	static ga = new MartyriaFthongos('ga', 3, new Glyph(Glyph.font_byzantina, '3'));
	static di = new MartyriaFthongos('di', 4, new Glyph(Glyph.font_byzantina, '4'));
	static ke = new MartyriaFthongos('ke', 5, new Glyph(Glyph.font_byzantina, '5'));
	static zo = new MartyriaFthongos('zo', 6, new Glyph(Glyph.font_byzantina, '6'));

	/**
	 * @param {string} name
	 * @param {number} note
	 * @param {Glyph} glyph
	 */
	constructor(name, note, glyph) {
		this.name = name;
		this.note = note;
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
