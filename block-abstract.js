/**
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
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

	static newline = new AbstractBlock(AbstractBlock.type_newline);

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
		const div = document.createElement('div');
		div.classList.add('bz-block');
		if (this === AbstractBlock.newline)
			div.classList.add('bz-newline');
		return div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		return [];
	}

	/**
	 * @returns {[{index: number, beats: number}]}
	 */
	get_times() {
		return [];
	}
}
