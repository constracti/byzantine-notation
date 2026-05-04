import { AbstractBlock } from './block-abstract.js';
import { Klimaka } from './klimaka.js';

/**
 * @typedef {import('./vathmida.js').Vathmida} Vathmida
 */

/**
 * @typedef {import('./fthora.js').Fthora} Fthora
 */

/**
 * @typedef {import('./ichos.js').Ichos} Ichos
 */

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
	 * @type {Fthora}
	 */
	#fthora;

	/**
	 * @param {Ichos} ichos
	 * @param {Vathmida} vathmida
	 * @param {Fthora} fthora
	 */
	constructor(ichos, vathmida, fthora) {
		super(AbstractBlock.type_ichos);
		this.#ichos = ichos;
		this.#vathmida = vathmida;
		this.#fthora = fthora;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div(); // TODO height
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(...this.#ichos.get_span_list());
		symbol_div.append(this.#vathmida.get_ichos_span());
		symbol_div.append(this.#fthora.get_span(this));
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
		music_context.klimaka = Klimaka.get_default();
		this.#fthora.apply(music_context);
		return null;
	}
}
