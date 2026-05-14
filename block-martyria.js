import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { Layer } from './layer.js';
import { Character } from './character.js';

/**
 * @import {Fthongos} from './fthongos.js'
 * @import {Fthora} from './fthora.js'
 * @import {Agogi} from './agogi.js'
 * @import {MartyrikoSimadi} from './martyriko-simadi.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class MartyriaBlock extends AbstractBlock {

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
		super(AbstractBlock.type_martyria);
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
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		const symbol_main_div = document.createElement('div');
		symbol_main_div.classList.add('bz-symbol-main')
		symbol_main_div.append(this.#fthongos.get_martyria_span());
		symbol_main_div.append(this.#layer_map.get(this.#simadi).get_martyria_main_span(this.#fthongos));
		if (this.#fthora !== null)
			symbol_main_div.append(this.#layer_map.get(this.#fthora).get_martyria_main_span(this.#fthongos));
		if (this.#agogi !== null)
			symbol_main_div.append(this.#layer_map.get(this.#agogi).get_martyria_main_span(this.#fthongos));
		if (this.#simadi.teleies)
			symbol_main_div.append(MartyriaBlock.#get_teleies_span());
		const symbol_next_div = document.createElement('div');
		for (let diapason = 1; diapason <= this.#fthongos.diapason; diapason++)
			symbol_next_div.append(MartyriaBlock.#get_tonos_span());
		symbol_div.append(symbol_main_div, symbol_next_div);
		// if (this.#fthongos.diapason >= 0)
		// 	symbol_div.append(this.#simadi.get_normal_span());
		// else
		// 	symbol_div.append(this.#simadi.get_flipped_span());
		block_div.append(symbol_div); // TODO add space after symbol
		return block_div;
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
