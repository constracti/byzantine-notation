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
	 * @param {Genos} genos
	 * @param {number} base_pitch
	 * @param {number} base_steps
	 */
	constructor(genos, base_pitch, base_steps) {
		this.#genos = genos;
		this.#base_pitch = base_pitch;
		this.#base_steps = base_steps;
	}

	/**
	 * @returns {Klimaka}
	 */
	static get_default() {
		return new Klimaka(Genos.diatoniko, Genos.diatoniko.base_fthongos.pitch, Genos.diatoniko.base_steps);
	}

	// TODO add chroa

	/**
	 * @param {number} pitch
	 * @returns {number}
	 */
	get_steps(pitch) {
		return this.#base_steps + this.#genos.get_steps_from_base(pitch - this.#base_pitch);
	}
}
