import { Fthongos } from './fthongos.js';


export class Klimaka {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Fthongos}
	 */
	base;

	/**
	 * @type {number[]}
	 */
	interval_list;

	/**
	 * base distance from tuner
	 * @type {number}
	 */
	steps;
	
	/**
	 * @type {number[]}
	 */
	#distance_list;

	/**
	 * @type {number}
	 */
	#interval_sum;

	static diatoniki = new Klimaka('diatoniki', Fthongos.ni, [12, 10, 8, 12, 12, 10, 8], -54);
	static chromatiki_malaki = new Klimaka('chromatiki-malaki', Fthongos.di, [8, 14, 8, 8, 14, 8, 12], -12);
	static chromatiki_skliri = new Klimaka('chromatiki-skliri', Fthongos.pa, [6, 20, 4, 12, 6, 20, 4], -42);
	static enarmonia = new Klimaka('enarmonia', Fthongos.ga, [12, 12, 6, 12, 12, 12, 6], -24);

	/**
	 * @param {string} name
	 * @param {Fthongos} base
	 * @param {number[]} interval_list
	 * @param {number} steps
	 */
	constructor(name, base, interval_list, steps) {
		this.name = name;
		this.base = base;
		this.interval_list = interval_list;
		this.steps = steps;
		this.#distance_list = [0];
		interval_list.forEach(interval => {
			const distance = this.#distance_list[this.#distance_list.length - 1];
			this.#distance_list.push(distance + interval);
		});
		this.#interval_sum = this.#distance_list.pop();
	}

	/**
	 * @param {number} pitch
	 * @param {number} base_steps
	 */
	get_pitch_steps(pitch, base_steps) {
		let pitch_difference = pitch - this.base.index;
		let octave_count = 0;
		while (pitch_difference < 0) {
			pitch_difference += this.#distance_list.length;
			octave_count--;
		}
		while (pitch_difference >= this.#distance_list.length) {
			pitch_difference -= this.#distance_list.length;
			octave_count++;
		}
		return base_steps + this.#distance_list[pitch_difference] + octave_count * this.#interval_sum;
	}
}
