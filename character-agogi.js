import { Glyph } from './glyph.js';
import { Character } from './character.js';


export class Agogi extends Character {

	/**
	 * @type {number}
	 */
	#tempo;

	/**
	 * @type {Glyph}
	 */
	#block_glyph;

	static metria = new Agogi('metria', 120, new Glyph(Glyph.font_chronos, 'k'), new Glyph(Glyph.font_chronos, 'K'));
	static tacheia = new Agogi('tacheia', 180, new Glyph(Glyph.font_chronos, 'l'), new Glyph(Glyph.font_chronos, 'L'));

	/**
	 * @param {string} name
	 * @param {number} tempo
	 * @param {Glyph} block_glyph
	 * @param {Glyph} martyria_glyph
	 */
	constructor(name, tempo, block_glyph, martyria_glyph) {
		super(name, Character.type_agogi, martyria_glyph);
		this.#tempo = tempo;
		this.#block_glyph = block_glyph;
	}

	/**
	 * @returns {number}
	 */
	get_tempo() {
		return this.#tempo;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_block_span() {
		const span = this.#block_glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
