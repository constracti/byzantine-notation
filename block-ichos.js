import { AbstractBlock } from './block-abstract.js';
import { Ichos } from './ichos.js';
import { Vathmida } from './vathmida.js';

/**
 * @typedef {import('./common.js').MusicContext} MusicContext
 */

/**
 * @typedef {import('./common.js').Part} Part
 */


export class IchosBlock extends AbstractBlock {

	/**
	 * @type {Ichos}
	 */
	#ichos;

	/**
	 * @type {Vathmida}
	 */
	#vathmida;

	/**
	 * @param {Ichos} ichos
	 * @param {Vathmida} vathmida
	 */
	constructor(ichos, vathmida) {
		super(AbstractBlock.type_ichos);
		this.#ichos = ichos;
		this.#vathmida = vathmida;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(...this.#ichos.get_span_list());
		symbol_div.append(this.#vathmida.get_ichos_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.pitch = this.#vathmida.pitch;
		// TODO set context klimaka, base pitch and base steps
		return null;
	}
}
