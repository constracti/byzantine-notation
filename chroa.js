import { Glyph } from './glyph.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @typedef {import('./common.js').MusicContext} MusicContext
 */


export class Chroa extends SecondaryCharacter {

	/**
	 * @type {number[]} partial sums of intervals from reference fthongos
	 */
	#lower;

	/**
	 * @type {number[]} partial sums of intervals from reference fthongos
	 */
	#upper;

	static zygos = new Chroa('zygos', [4, 16, 4], [], new Glyph(Glyph.font_fthores, '9'), new Glyph(Glyph.font_fthores, '('));
	static spathi = new Chroa('spathi', [4], [4], new Glyph(Glyph.font_fthores, '`'), new Glyph(Glyph.font_fthores, '~'));
	static kliton = new Chroa('kliton', [4, 12], [], new Glyph(Glyph.font_fthores, '-'), new Glyph(Glyph.font_fthores, '_'));

	/**
	 * @param {string} name
	 * @param {number[]} lower
	 * @param {number[]} upper
	 * @param {Glyph} glyph
	 * @param {Glyph} glyph_thin
	 */
	constructor(name, lower, upper, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_chroa, glyph, glyph_thin);
		this.#lower = [];
		lower.forEach(interval => {
			if (this.#lower.length > 0)
				this.#lower.push(this.#lower[this.#lower.length - 1] + interval);
			else
				this.#lower.push(interval);
		});
		this.#upper = [];
		upper.forEach(interval => {
			if (this.#upper.length > 0)
				this.#upper.push(this.#upper[this.#upper.length - 1] + interval);
			else
				this.#upper.push(interval);
		});
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
	}
	
	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		const home_pitch = music_context.pitch;
		const home_steps = music_context.klimaka.get_steps(home_pitch);
		this.#lower.forEach((steps, index) => {
			music_context.klimaka.set_steps(home_pitch - index - 1, home_steps - steps);
		});
		this.#upper.forEach((steps, index) => {
			music_context.klimaka.set_steps(home_pitch + index + 1, home_steps + steps);
		});
	}
}
