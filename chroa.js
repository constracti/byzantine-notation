import { Glyph } from './glyph.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @import {MusicContext} from './common.js'
 */


export class Chroa extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	#lower_distance_list;

	/**
	 * @type {number[]}
	 */
	#upper_distance_list;

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_narrow;

	static zygos = new Chroa('zygos', [4, 16, 4], [], new Glyph(Glyph.font_fthores, '9'), new Glyph(Glyph.font_fthores, '('));
	static spathi = new Chroa('spathi', [4], [4], new Glyph(Glyph.font_fthores, '`'), new Glyph(Glyph.font_fthores, '~'));
	static kliton = new Chroa('kliton', [4, 12], [], new Glyph(Glyph.font_fthores, '-'), new Glyph(Glyph.font_fthores, '_'));

	/**
	 * @param {string} name
	 * @param {number[]} lower_interval_list
	 * @param {number[]} upper_interval_list
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_narrow
	 */
	constructor(name, lower_interval_list, upper_interval_list, glyph_normal, glyph_narrow) {
		super(name, SecondaryCharacter.type_chroa, glyph_normal, glyph_narrow);
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
		this.#glyph_normal = glyph_normal;
		this.#glyph_narrow = glyph_narrow;
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
