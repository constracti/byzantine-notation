import { Glyph } from './glyph.js';


export class Agogi {

	/**
	 * @type {name}
	 */
	name;

	/**
	 * @type {number}
	 */
	tempo;

	/**
	 * @type {Glyph}
	 */
	#glyph_block;

	/**
	 * @type {Glyph}
	 */
	#glyph_martyria;

	static metria = new Agogi('metria', 120, new Glyph(Glyph.font_chronos, 'k'), new Glyph(Glyph.font_chronos, 'K'));
	static tacheia = new Agogi('tacheia', 180, new Glyph(Glyph.font_chronos, 'l'), new Glyph(Glyph.font_chronos, 'L'));

	/**
	 * @param {string} name
	 * @param {number} tempo
	 * @param {Glyph} glyph_block
	 * @param {Glyph} glyph_martyria
	 */
	constructor(name, tempo, glyph_block, glyph_martyria) {
		this.name = name;
		this.tempo = tempo;
		this.#glyph_block = glyph_block;
		this.#glyph_martyria = glyph_martyria;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_block_span() {
		const span = this.#glyph_block.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_span() {
		const span = this.#glyph_martyria.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
