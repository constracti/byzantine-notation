import { Vathmida } from './vathmida.js';


export class Fthongos {

	/**
	 * @type {Vathmida}
	 */
	vathmida;

	/**
	 * typically -1 for vareia, 0 for mesi, and +1 for oxeia
	 * @type {number}
	 */
	diapason;

	/**
	 * @type {number}
	 */
	pitch;

	static ga_kato = new Fthongos(Vathmida.ga, -1);
	static di_kato = new Fthongos(Vathmida.di, -1);
	static ke_kato = new Fthongos(Vathmida.ke, -1);
	static zo = new Fthongos(Vathmida.zo, 0);
	static ni = new Fthongos(Vathmida.ni, 0);
	static pa = new Fthongos(Vathmida.pa, 0);
	static vou = new Fthongos(Vathmida.vou, 0);
	static ga = new Fthongos(Vathmida.ga, 0);
	static di = new Fthongos(Vathmida.di, 0);
	static ke = new Fthongos(Vathmida.ke, 0);
	static zo_ano = new Fthongos(Vathmida.zo, +1);
	static ni_ano = new Fthongos(Vathmida.ni, +1);
	static pa_ano = new Fthongos(Vathmida.pa, +1);
	static vou_ano = new Fthongos(Vathmida.vou, +1);
	static ga_ano = new Fthongos(Vathmida.ga, +1);
	static di_ano = new Fthongos(Vathmida.di, +1);
	static ke_ano = new Fthongos(Vathmida.ke, +1);

	/**
	 * @param {Vathmida} vathmida
	 * @param {number} diapason
	 */
	constructor(vathmida, diapason) {
		this.vathmida = vathmida;
		this.diapason = diapason;
		this.pitch = vathmida.pitch + 7 * diapason;
	}
}
