import { Glyph } from './glyph.js';
import { Character } from './character.js';

/**
 * @import {MusicContext} from './common.js'
 */


export class Chroa extends Character {

	/**
	 * @type {number[]}
	 */
	#lower_distance_list;

	/**
	 * @type {number[]}
	 */
	#upper_distance_list;

	static zygos = new Chroa('zygos', [4, 16, 4], [], Glyph.zygos);
	static spathi = new Chroa('spathi', [4], [4], Glyph.spathi);
	static kliton = new Chroa('kliton', [4, 12], [], Glyph.kliton);

	/**
	 * @param {string} name
	 * @param {number[]} lower_interval_list
	 * @param {number[]} upper_interval_list
	 * @param {Glyph} glyph
	 */
	constructor(name, lower_interval_list, upper_interval_list, glyph) {
		super(name, Character.type_chroa, glyph);
		this.#lower_distance_list = [];
		lower_interval_list.forEach(interval => {
			const length = this.#lower_distance_list.length;
			if (length > 0)
				this.#lower_distance_list.push(this.#lower_distance_list[length - 1] + interval);
			else
				this.#lower_distance_list.push(interval);
		});
		this.#upper_distance_list = [];
		upper_interval_list.forEach(interval => {
			const length = this.#upper_distance_list.length;
			if (length > 0)
				this.#upper_distance_list.push(this.#upper_distance_list[length - 1] + interval);
			else
				this.#upper_distance_list.push(interval);
		});
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}
	
	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		const pitch = music_context.melos_pitch;
		const steps = music_context.klimaka.get_steps(pitch);
		this.#lower_distance_list.forEach((distance, index) => {
			music_context.klimaka.set_steps(pitch - index - 1, steps - distance);
		});
		this.#upper_distance_list.forEach((distance, index) => {
			music_context.klimaka.set_steps(pitch + index + 1, steps + distance);
		});
	}
}
