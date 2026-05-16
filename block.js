import { Character } from './character.js';

/**
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class Block {

	/**
	 * @type {string}
	 */
	type;

	static type_ichos = 'ichos';
	static type_posotita = 'posotita';
	static type_martyria = 'martyria';
	static type_diastoli = 'diastoli';
	static type_agogi = 'agogi';
	static type_newline = 'newline';
	static type_stavros = 'stavros';

	static diastoli = new Block(Block.type_diastoli);
	static newline = new Block(Block.type_newline);
	static stavros = new Block(Block.type_stavros);

	/**
	 * @param {string} type
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
		if (this === Block.newline)
			div.classList.add('bz-newline');
		div.append(this.#get_symbol_div() ?? '');
		return div;
	}

	/**
	 * @returns {?HTMLDivElement}
	 */
	#get_symbol_div() {
		if (this.type === Block.type_diastoli)
			return Block.#get_symbol_div_by_character(Character.diastoli);
		if (this.type === Block.type_stavros)
			return Block.#get_symbol_div_by_character(Character.stavros);
		return null;
	}

	/**
	 * @param {Character} character
	 * @returns {HTMLDivElement}
	 */
	static #get_symbol_div_by_character(character) {
		const div = document.createElement('div');
		div.classList.add('bz-symbol');
		const span = character.glyph.get_span();
		const color = character.get_color();
		if (color !== null)
			span.classList.add(color);
		div.append(span);
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
