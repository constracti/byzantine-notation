import { Glyph } from './glyph.js';


export class Fthongos {

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
	glyph_martyria;

	/**
	 * @type {Glyph}
	 */
	glyph_ichos;

	static ni = new Fthongos('ni', 0, new Glyph(Glyph.font_byzantina, '7'), new Glyph(Glyph.font_ison, 'p'));
	static pa = new Fthongos('pa', 1, new Glyph(Glyph.font_byzantina, '1'), new Glyph(Glyph.font_ison, '['));
	static vou = new Fthongos('vou', 2, new Glyph(Glyph.font_byzantina, '2'), new Glyph(Glyph.font_ison, ']'));
	static ga = new Fthongos('ga', 3, new Glyph(Glyph.font_byzantina, '3'), new Glyph(Glyph.font_ison, '\\'));
	static di = new Fthongos('di', 4, new Glyph(Glyph.font_byzantina, '4'), new Glyph(Glyph.font_ison, 'P'));
	static ke = new Fthongos('ke', 5, new Glyph(Glyph.font_byzantina, '5'), new Glyph(Glyph.font_ison, '{'));
	static zo = new Fthongos('zo', 6, new Glyph(Glyph.font_byzantina, '6'), new Glyph(Glyph.font_ison, '}'));

	/**
	 * @param {string} name
	 * @param {number} note
	 * @param {Glyph} glyph_martyria
	 * @param {Glyph} glyph_ichos
	 */
	constructor(name, note, glyph_martyria, glyph_ichos) {
		this.name = name;
		this.note = note;
		this.glyph_martyria = glyph_martyria;
		this.glyph_ichos = glyph_ichos;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_span() {
		const span = this.glyph_martyria.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_ichos_span() {
		const span = this.glyph_ichos.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
