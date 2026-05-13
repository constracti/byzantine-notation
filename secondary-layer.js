/**
 * @import {SecondaryCharacter} from './secondary.js'
 */


export class SecondaryLayer {

	/**
	 * @type {SecondaryCharacter}
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
	 * @param {SecondaryCharacter} character
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
	 * @returns {SecondaryCharacter}
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
	 * @returns {?HTMLSpanElement}
	 */
	get_prev_span() {
		return this.#character.get_prev_span();
	}

	/**
	 * @returns {number}
	 */
	get_prev_margin() {
		return this.#character.get_prev_margin();
	}

	/**
	 * @param {*} primary
	 * @returns {?HTMLSpanElement}
	 */
	get_main_span(primary) {
		return this.#character.get_main_span(primary, this.#horizontal_offset, this.#vertical_offset);
	}
}
