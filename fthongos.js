import { Glyph } from './glyph.js';
import { Vathmida } from './vathmida.js';


export class Fthongos {

	/**
	 * @type {Vathmida}
	 */
	#vathmida;

	/**
	 * typically -1 for vareia, 0 for mesi, and +1 for oxeia
	 * @type {number}
	 */
	diapason;

	/**
	 * @type {Glyph}
	 */
	#glyph_martyria;

	/**
	 * @type {number}
	 */
	pitch;

	static #martyria_ga_kato = new Glyph(Glyph.font_fthores, 'z');
	static #martyria_di_kato = new Glyph(Glyph.font_fthores, 'a');
	static #martyria_ke_kato = new Glyph(Glyph.font_fthores, 's');
	static #martyria_zo = new Glyph(Glyph.font_byzantina, '6');
	static #martyria_ni = new Glyph(Glyph.font_byzantina, '7');
	static #martyria_pa = new Glyph(Glyph.font_byzantina, '1');
	static #martyria_vou = new Glyph(Glyph.font_byzantina, '2');
	static #martyria_ga = new Glyph(Glyph.font_byzantina, '3');
	static #martyria_di = new Glyph(Glyph.font_byzantina, '4');
	static #martyria_ke = new Glyph(Glyph.font_byzantina, '5');

	static ga_kato = new Fthongos(Vathmida.ga, -1, Fthongos.#martyria_ga_kato);
	static di_kato = new Fthongos(Vathmida.di, -1, Fthongos.#martyria_di_kato);
	static ke_kato = new Fthongos(Vathmida.ke, -1, Fthongos.#martyria_ke_kato);
	static zo = new Fthongos(Vathmida.zo, 0, Fthongos.#martyria_zo);
	static ni = new Fthongos(Vathmida.ni, 0, Fthongos.#martyria_ni);
	static pa = new Fthongos(Vathmida.pa, 0, Fthongos.#martyria_pa);
	static vou = new Fthongos(Vathmida.vou, 0, Fthongos.#martyria_vou);
	static ga = new Fthongos(Vathmida.ga, 0, Fthongos.#martyria_ga);
	static di = new Fthongos(Vathmida.di, 0, Fthongos.#martyria_di);
	static ke = new Fthongos(Vathmida.ke, 0, Fthongos.#martyria_ke);
	static zo_ano = new Fthongos(Vathmida.zo, +1, Fthongos.#martyria_zo);
	static ni_ano = new Fthongos(Vathmida.ni, +1, Fthongos.#martyria_ni);
	static pa_ano = new Fthongos(Vathmida.pa, +1, Fthongos.#martyria_pa);
	static vou_ano = new Fthongos(Vathmida.vou, +1, Fthongos.#martyria_vou);
	static ga_ano = new Fthongos(Vathmida.ga, +1, Fthongos.#martyria_ga);
	static di_ano = new Fthongos(Vathmida.di, +1, Fthongos.#martyria_di);
	static ke_ano = new Fthongos(Vathmida.ke, +1, Fthongos.#martyria_ke);

	/**
	 * @param {Vathmida} vathmida
	 * @param {number} diapason
	 * @param {Glyph} glyph_martyria
	 */
	constructor(vathmida, diapason, glyph_martyria) {
		this.#vathmida = vathmida;
		this.diapason = diapason;
		this.#glyph_martyria = glyph_martyria;
		this.pitch = vathmida.pitch + 7 * diapason;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_span() {
		const span = this.#glyph_martyria.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
