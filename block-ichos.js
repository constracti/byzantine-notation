import { AbstractBlock } from './block-abstract.js';
import { Ichos } from './ichos.js';
import { Fthongos } from './fthongos.js';

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
	ichos;

	/**
	 * @type {Fthongos}
	 */
	fthongos;

	/**
	 * @param {Ichos} ichos
	 * @param {Fthongos} fthongos
	 */
	constructor(ichos, fthongos) {
		super(AbstractBlock.type_ichos);
		this.ichos = ichos;
		this.fthongos = fthongos;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(...this.ichos.get_span_list());
		symbol_div.append(this.fthongos.get_ichos_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		// TODO set context scale
		music_context.pitch = this.fthongos.index; // TODO varys octave
		return null;
	}
}
