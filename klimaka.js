import { Fthongos } from './fthongos.js';


export class Klimaka {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Fthongos}
	 */
	fthongos;

	/**
	 * @type {number[]}
	 */
	#interval_list;

	/**
	 * default base distance from tuner
	 * @type {number}
	 */
	base_steps;
	
	/**
	 * @type {number[]}
	 */
	#distance_list;

	/**
	 * @type {number}
	 */
	#interval_sum;

	static diatoniki = new Klimaka('diatoniki', Fthongos.ni, [12, 10, 8, 12, 12, 10, 8], -54);
	static chromatiki_malaki = new Klimaka('chromatiki-malaki', Fthongos.di, [8, 14, 8, 12], -12);
	static chromatiki_skliri = new Klimaka('chromatiki-skliri', Fthongos.pa, [6, 20, 4, 12], -42);
	static enarmonia = new Klimaka('enarmonia', Fthongos.ga, [12, 12, 6, 12, 12, 12, 6], -24);

	/**
	 * @param {string} name
	 * @param {Fthongos} fthongos
	 * @param {number[]} interval_list
	 * @param {number} base_steps
	 */
	constructor(name, fthongos, interval_list, base_steps) {
		this.name = name;
		this.fthongos = fthongos;
		this.#interval_list = interval_list;
		this.base_steps = base_steps;
		this.#distance_list = [0];
		interval_list.forEach(interval => {
			const distance = this.#distance_list[this.#distance_list.length - 1];
			this.#distance_list.push(distance + interval);
		});
		this.#interval_sum = this.#distance_list.pop();
	}

	/**
	 * @param {number} pitch_from_base
	 * @returns {number}
	 */
	get_steps_from_base(pitch_from_base) {
		const dividend = pitch_from_base;
		const divisor = this.#distance_list.length;
		let remainder = dividend;
		let quotient = 0;
		while (remainder < 0) {
			remainder += divisor;
			quotient--;
		}
		while (remainder >= divisor) {
			remainder -= divisor;
			quotient++;
		}
		return this.#distance_list[remainder] + quotient * this.#interval_sum;
	}
}
