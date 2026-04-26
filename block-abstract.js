/**
 * @typedef {import('./common.js').MusicContext} MusicContext
 */

/**
 * @typedef {import('./common.js').Part} Part
 */


export class AbstractBlock {

	/**
	 * @type {?string}
	 */
	type;

	static type_ichos = 'ichos';
	static type_posotita = 'posotita';
	static type_martyria = 'martyria';
	static type_agogi = 'agogi';
	static type_newline = 'newline';

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
