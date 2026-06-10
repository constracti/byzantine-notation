/**
 * @import {PosotitaBlock} from './block-posotita.js'
 * @import {Fthongos} from './fthongos.js'
 * @import {Vathmida} from './vathmida.js'
 * @import {Character} from './character.js'
 */


export class Layer {

	/**
	 * @type {Character}
	 */
	#character;

	/**
	 * @type {number}
	 */
	#target;

	/**
	 * @type {number}
	 */
	#horizontal_offset;

	/**
	 * @type {number}
	 */
	#vertical_offset;

	/**
	 * @param {Character} character
	 * @param {number} target
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 */
	constructor(character, target, horizontal_offset, vertical_offset) {
		this.#character = character;
		this.#target = target;
		this.#horizontal_offset = horizontal_offset;
		this.#vertical_offset = vertical_offset;
	}

	/**
	 * @returns {Character}
	 */
	get_character() {
		return this.#character;
	}

	/**
	 * @type {number}
	 */
	get_target() {
		return this.#target;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {?HTMLSpanElement}
	 */
	get_posotita_main_span(block) {
		return this.#character.get_posotita_main_span(block, this.#target, this.#horizontal_offset, this.#vertical_offset);
	}

	/**
	 * @param {Fthongos} fthongos
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_main_span(fthongos) {
		return this.#character.get_martyria_main_span(fthongos, this.#horizontal_offset, this.#vertical_offset);
	}

	/**
	 * @param {Vathmida} vathmida
	 * @returns {HTMLSpanElement}
	 */
	get_ichos_main_span(vathmida) {
		return this.#character.get_ichos_main_span(vathmida, this.#horizontal_offset, this.#vertical_offset);
	}
}
