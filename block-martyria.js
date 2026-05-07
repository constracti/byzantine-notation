import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';

/**
 * @import {Fthongos} from './fthongos.js'
 * @import {MartyrikoSimadi} from './martyriko-simadi.js'
 * @import {Fthora} from './fthora.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
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
	 * @type {?Fthora}
	 */
	#fthora = null;

	/**
	 * @param {Fthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param {Fthora[]} args 
	 */
	constructor(fthongos, simadi, ...args) {
		super(AbstractBlock.type_martyria);
		this.#fthongos = fthongos;
		this.#simadi = simadi;
		args.forEach(arg => {
			this.#fthora = arg;
		});
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.#fthongos.get_martyria_span());
		if (this.#fthongos.diapason >= 0)
			symbol_div.append(this.#simadi.get_normal_span());
		else
			symbol_div.append(this.#simadi.get_flipped_span());
		if (this.#simadi.teleies)
			symbol_div.append(MartyriaBlock.#get_teleies_span());
		if (this.#fthora !== null)
			symbol_div.append(this.#fthora.get_martyria_span());
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

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		if (this.#fthora !== null)
			this.#fthora.apply(music_context);
		return [];
	}
}
