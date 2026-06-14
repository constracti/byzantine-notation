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

	static ni = new Vathmida('ni', 0, Glyph.vathmida_ni);
	static pa = new Vathmida('pa', 1, Glyph.vathmida_pa);
	static vou = new Vathmida('vou', 2, Glyph.vathmida_vou);
	static ga = new Vathmida('ga', 3, Glyph.vathmida_ga);
	static di = new Vathmida('di', 4, Glyph.vathmida_di);
	static ke = new Vathmida('ke', 5, Glyph.vathmida_ke);
	static zo = new Vathmida('zo', -1, Glyph.vathmida_zo);

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
	 * @returns {HTMLImageElement}
	 */
	get_ichos_img() {
		const img = this.#glyph_ichos.get_img();
		img.classList.add(Glyph.color_red);
		return img;
	}
}
