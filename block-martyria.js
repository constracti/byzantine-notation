import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';

/**
 * @typedef {import('./fthongos.js').Fthongos} Fthongos
 */

/**
 * @typedef {import('./martyriko-simadi.js').MartyrikoSimadi} MartyrikoSimadi
 */


export class MartyriaBlock extends AbstractBlock {

	/**
	 * @type {Fthongos}
	 */
	#fthongos;

	/**
	 * @type {MartyrikoSimadi}
	 */
	#simadi;

	/**
	 * @type {boolean}
	 */
	#teleies;

	/**
	 * @param {Fthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param {boolean} teleies
	 */
	constructor(fthongos, simadi, teleies) {
		super(AbstractBlock.type_martyria);
		this.#fthongos = fthongos;
		this.#simadi = simadi;
		this.#teleies = teleies;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		// TODO ypatoeideis fthongoi
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.#fthongos.vathmida.get_martyria_span());
		if (this.#teleies)
			symbol_div.append(MartyriaBlock.#get_teleies_span());
		symbol_div.append(this.#simadi.get_span());
		for (let diapason = 1; diapason <= this.#fthongos.diapason; diapason++)
			symbol_div.append(MartyriaBlock.#get_tonos_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_teleies_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '`');
		const span = glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_tonos_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '~');
		const span = glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
