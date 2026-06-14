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

	static metria = new Agogi('metria', 120, Glyph.agogi_metria, Glyph.agogi_metria_martyria);
	static tacheia = new Agogi('tacheia', 180, Glyph.agogi_tacheia, Glyph.agogi_tacheia_martyria);

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
	 * @returns {HTMLImageElement}
	 */
	get_block_img() {
		const img = this.#block_glyph.get_img();
		img.classList.add(Glyph.color_red);
		return img;
	}
}
