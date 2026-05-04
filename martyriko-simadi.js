import { Glyph } from './glyph.js';


export class MartyrikoSimadi {

	/**
	 * @type {string}
	 */
	name; // TODO martyriko simadi names

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_flipped;

	/**
	 * @type {boolean}
	 */
	teleies;

	static #normal_alfa = new Glyph(Glyph.font_byzantina, '!');
	static #flipped_alfa = new Glyph(Glyph.font_fthores, 'S');
	static #normal_lambda = new Glyph(Glyph.font_byzantina, '@');
	static #normal_nana = new Glyph(Glyph.font_byzantina, '#');
	static #flipped_nana = new Glyph(Glyph.font_fthores, 'Z');
	static #normal_varys = new Glyph(Glyph.font_byzantina, '^');
	static #normal_delta = new Glyph(Glyph.font_byzantina, '&');
	static #flipped_delta = new Glyph(Glyph.font_fthores, 'A');
	static #normal_skliro = new Glyph(Glyph.font_byzantina, '$');
	static #flipped_skliro = new Glyph(Glyph.font_fthores, 'X');
	static #normal_defteros = new Glyph(Glyph.font_byzantina, '%');
	static #flipped_defteros = new Glyph(Glyph.font_fthores, 'x');

	static alfa = new MartyrikoSimadi('alfa', MartyrikoSimadi.#normal_alfa, MartyrikoSimadi.#flipped_alfa, false);
	static alfa_teleies = new MartyrikoSimadi('alfa-teleies', MartyrikoSimadi.#normal_alfa, MartyrikoSimadi.#flipped_alfa, true);
	static lambda = new MartyrikoSimadi('lambda', MartyrikoSimadi.#normal_lambda, Glyph.empty, false);
	static nana = new MartyrikoSimadi('nana', MartyrikoSimadi.#normal_nana, MartyrikoSimadi.#flipped_nana, false);
	static varys = new MartyrikoSimadi('varys', MartyrikoSimadi.#normal_varys, Glyph.empty, false);
	static delta = new MartyrikoSimadi('delta', MartyrikoSimadi.#normal_delta, MartyrikoSimadi.#flipped_delta, false);
	static delta_teleies = new MartyrikoSimadi('delta-teleies', MartyrikoSimadi.#normal_delta, MartyrikoSimadi.#flipped_delta, true);
	static skliro = new MartyrikoSimadi('skliro', MartyrikoSimadi.#normal_skliro, MartyrikoSimadi.#flipped_skliro, false);
	static defteros = new MartyrikoSimadi('defteros', MartyrikoSimadi.#normal_defteros, MartyrikoSimadi.#flipped_defteros, false);
	static defteros_teleies = new MartyrikoSimadi('defteros-teleies', MartyrikoSimadi.#normal_defteros, MartyrikoSimadi.#flipped_defteros, true);

	/**
	 * @param {string} name
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_flipped
	 * @param {boolean} teleies
	 */
	constructor(name, glyph_normal, glyph_flipped, teleies) {
		this.name = name;
		this.#glyph_normal = glyph_normal;
		this.#glyph_flipped = glyph_flipped;
		this.teleies = teleies;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_normal_span() {
		const span = this.#glyph_normal.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_flipped_span() {
		const span = this.#glyph_flipped.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
