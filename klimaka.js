import { Genos } from './genos.js';


export class Klimaka {

	/**
	 * @type {Genos}
	 */
	#genos;

	/**
	 * @type {number}
	 */
	#base_pitch;

	/**
	 * @type {number}
	 */
	#base_steps;

	/**
	 * @type {Map<number, number>}
	 */
	#step_by_pitch_map;

	/**
	 * @param {Genos} genos
	 * @param {number} base_pitch
	 * @param {number} base_steps
	 */
	constructor(genos, base_pitch, base_steps) {
		this.#genos = genos;
		this.#base_pitch = base_pitch;
		this.#base_steps = base_steps;
		this.#step_by_pitch_map = new Map();
	}

	/**
	 * @returns {Klimaka}
	 */
	static get_default() {
		return new Klimaka(Genos.diatoniko, Genos.diatoniko.base_fthongos.pitch, Genos.diatoniko.base_steps);
	}

	/**
	 * @param {number} pitch
	 * @returns {number}
	 */
	get_steps(pitch) {
		if (this.#step_by_pitch_map.has(pitch))
			return this.#step_by_pitch_map.get(pitch);
		return this.#base_steps + this.#genos.get_steps_from_base(pitch - this.#base_pitch);
	}

	/**
	 * @param {number} pitch
	 * @param {number} steps
	 */
	set_steps(pitch, steps) {
		this.#step_by_pitch_map.set(pitch, steps);
	}
}
