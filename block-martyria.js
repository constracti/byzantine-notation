import { Glyph } from './glyph.js';
import { Block } from './block.js';
import { Layer } from './layer.js';
import { Character } from './character.js';

/**
 * @import {Fthongos} from './fthongos.js'
 * @import {Fthora} from './character-fthora.js'
 * @import {Agogi} from './character-agogi.js'
 * @import {MartyrikoSimadi} from './character-martyriko-simadi.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class MartyriaBlock extends Block {

	/**
	 * @type {Fthongos}
	 */
	#fthongos;

	/**
	 * @type {MartyrikoSimadi}
	 */
	#simadi;

	/**
	 * @type {?Fthora}
	 */
	#fthora;

	/**
	 * @type {?Agogi}
	 */
	#agogi;

	/**
	 * @type {Map<Character, Layer>}
	 */
	#layer_map;

	/**
	 * @param {Fthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param {?Fthora} fthora
	 * @param {?Agogi} agogi
	 */
	constructor(fthongos, simadi, fthora, agogi, layer_map) {
		super(Block.type_martyria);
		this.#fthongos = fthongos;
		this.#simadi = simadi;
		this.#fthora = fthora;
		this.#agogi = agogi;
		this.#layer_map = layer_map;
	}

	/**
	 * @param {Fthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param  {...Character} args
	 * @returns {MartyriaBlock}
	 */
	static build(fthongos, simadi, ...args) {
		/**
		 * @type {?Fthora}
		 */
		let fthora = null;
		/**
		 * @type {?Agogi}
		 */
		let agogi = null;
		/**
		 * @type {Map<Character, Layer>}
		 */
		const layer_map = new Map();
		layer_map.set(simadi, new Layer(simadi, 0, 0, 0));
		args.forEach(arg => {
			switch(arg.type) {
				case Character.type_fthora:
					fthora = arg;
					layer_map.set(arg, new Layer(arg, 0, 0, 0));
					break;
				case Character.type_agogi:
					agogi = arg;
					layer_map.set(arg, new Layer(arg, 0, 0, 0));
					break;
			}
		});
		return new MartyriaBlock(fthongos, simadi, fthora, agogi, layer_map);
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const div = super.get_div();
		div.append(this.#get_symbol_div()); // TODO add space after symbol
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol');
		div.append(this.#get_symbol_main_div())
		div.append(this.#get_symbol_next_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_main_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol-main')
		div.append(this.#fthongos.get_martyria_span());
		div.append(this.#layer_map.get(this.#simadi).get_martyria_main_span(this.#fthongos));
		if (this.#fthora !== null)
			div.append(this.#layer_map.get(this.#fthora).get_martyria_main_span(this.#fthongos));
		if (this.#agogi !== null)
			div.append(this.#layer_map.get(this.#agogi).get_martyria_main_span(this.#fthongos));
		if (this.#simadi.teleies)
			div.append(MartyriaBlock.#get_teleies_span());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_next_div() {
		const div = document.createElement('div');
		for (let diapason = 1; diapason <= this.#fthongos.diapason; diapason++)
			div.append(MartyriaBlock.#get_tonos_span());
		return div;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_teleies_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '`');
		return Character.get_main_span(glyph, Glyph.color_red, 0.02, 0);
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_tonos_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '~');
		const span = glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {boolean}
	 */
	keep_with_previous() {
		return true;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		if (this.#fthora !== null)
			this.#fthora.apply(music_context);
		if (this.#agogi !== null)
			music_context.tempo = this.#agogi.get_tempo();
		return [];
	}
}
