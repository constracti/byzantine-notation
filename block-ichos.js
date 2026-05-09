import { AbstractBlock } from './block-abstract.js';
import { Klimaka } from './klimaka.js';

/**
 * @import {Vathmida} from './vathmida.js'
 * @import {Fthora} from './fthora.js'
 * @import {Ichos} from './ichos.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
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
		symbol_div.append(this.#fthora.get_ichos_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.melos_pitch = this.#vathmida.pitch;
		music_context.ison_fthongos = null;
		music_context.klimaka = Klimaka.get_default();
		this.#fthora.apply(music_context);
		return [];
	}
}
