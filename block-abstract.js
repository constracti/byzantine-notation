import {} from './common.js';


export class AbstractBlock {

	/**
	 * @type {?string}
	 */
	type;

	/**
	 * @param {?string} type
	 */
	constructor(type) {
		this.type = type;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = document.createElement('div');
		block_div.classList.add('bz-block');
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		return null;
	}

	/**
	 * @returns {[{index: number, beats: number}]}
	 */
	get_times() {
		return [];
	}
}
