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

	static ga_kato = new Fthongos(Vathmida.ga, -1, Glyph.martyria_ga_kato);
	static di_kato = new Fthongos(Vathmida.di, -1, Glyph.martyria_di_kato);
	static ke_kato = new Fthongos(Vathmida.ke, -1, Glyph.martyria_ke_kato);
	static zo = new Fthongos(Vathmida.zo, 0, Glyph.martyria_zo);
	static ni = new Fthongos(Vathmida.ni, 0, Glyph.martyria_ni);
	static pa = new Fthongos(Vathmida.pa, 0, Glyph.martyria_pa);
	static vou = new Fthongos(Vathmida.vou, 0, Glyph.martyria_vou);
	static ga = new Fthongos(Vathmida.ga, 0, Glyph.martyria_ga);
	static di = new Fthongos(Vathmida.di, 0, Glyph.martyria_di);
	static ke = new Fthongos(Vathmida.ke, 0, Glyph.martyria_ke);
	static zo_ano = new Fthongos(Vathmida.zo, +1, Glyph.martyria_zo);
	static ni_ano = new Fthongos(Vathmida.ni, +1, Glyph.martyria_ni);
	static pa_ano = new Fthongos(Vathmida.pa, +1, Glyph.martyria_pa);
	static vou_ano = new Fthongos(Vathmida.vou, +1, Glyph.martyria_vou);
	static ga_ano = new Fthongos(Vathmida.ga, +1, Glyph.martyria_ga);
	static di_ano = new Fthongos(Vathmida.di, +1, Glyph.martyria_di);
	static ke_ano = new Fthongos(Vathmida.ke, +1, Glyph.martyria_ke);

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
	 * @returns {HTMLImageElement}
	 */
	get_martyria_img() {
		const img = this.#glyph_martyria.get_img();
		img.classList.add(Glyph.color_red);
		return img;
	}
}
