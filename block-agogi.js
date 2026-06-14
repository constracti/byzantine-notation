import { Block } from './block.js';

/**
 * @import {Agogi} from './character-agogi.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class AgogiBlock extends Block {

	/**
	 * @type {Agogi}
	 */
	#agogi;

	/**
	 * @param {Agogi} agogi
	 */
	constructor(agogi) {
		super(Block.type_agogi);
		this.#agogi = agogi;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const div = super.get_div();
		div.append(this.#get_symbol_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol');
		div.append(this.#agogi.get_block_img());
		return div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.tempo = this.#agogi.get_tempo();
		return [];
	}
}
