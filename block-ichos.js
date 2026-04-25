import { AbstractBlock } from './block-abstract.js';
import { Ichos } from './ichos.js';
import { Fthongos } from './fthongos.js';


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
		music_context.pitch = this.fthongos.note;
		return null;
	}
}
