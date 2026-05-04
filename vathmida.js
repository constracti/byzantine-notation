import { Glyph } from './glyph.js';


export class Vathmida {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * fthongos pitch in mesi diapason; -1 for zo, 0 for ni, 1 for pa, ..., 5 for ke
	 * @type {number}
	 */
	pitch;

	/**
	 * @type {Glyph}
	 */
	#glyph_ichos;

	static ni = new Vathmida('ni', 0, new Glyph(Glyph.font_ison, 'p'));
	static pa = new Vathmida('pa', 1, new Glyph(Glyph.font_ison, '['));
	static vou = new Vathmida('vou', 2, new Glyph(Glyph.font_ison, ']'));
	static ga = new Vathmida('ga', 3, new Glyph(Glyph.font_ison, '\\'));
	static di = new Vathmida('di', 4, new Glyph(Glyph.font_ison, 'P'));
	static ke = new Vathmida('ke', 5, new Glyph(Glyph.font_ison, '{'));
	static zo = new Vathmida('zo', -1, new Glyph(Glyph.font_ison, '}'));

	/**
	 * @param {string} name
	 * @param {number} pitch
	 * @param {Glyph} glyph_ichos
	 */
	constructor(name, pitch, glyph_ichos) {
		this.name = name;
		this.pitch = pitch;
		this.#glyph_ichos = glyph_ichos;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_ichos_span() {
		const span = this.#glyph_ichos.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
