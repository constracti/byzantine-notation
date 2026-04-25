import { AbstractBlock } from './block-abstract.js';
import { Agogi } from './agogi.js';


export class AgogiBlock extends AbstractBlock {

	/**
	 * @type {Agogi}
	 */
	agogi;

	/**
	 * @param {Agogi} agogi
	 */
	constructor(agogi) {
		super('agogi');
		this.agogi = agogi;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.agogi.get_primary_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.tempo = this.agogi.tempo;
		return null;
	}
}
