import { Block } from './block.js';
import { Posotita } from './posotita.js';
import { Layer } from './layer.js';
import { Character } from './character.js';

/**
 * @import {Chronos} from './chronos.js'
 * @import {Gorgon} from './gorgon.js'
 * @import {Alloiosi} from './alloiosi.js'
 * @import {Fthora} from './fthora.js'
 * @import {Chroa} from './chroa.js'
 * @import {Isokratima} from './isokratima.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


// TODO stick syneches elafron, omalon diplon and syndesmos with previous character

export class PosotitaBlock extends Block {

	/**
	 * @type {Posotita}
	 */
	#posotita;

	/**
	 * @type {Layer[]}
	 */
	#layer_list;

	/**
	 * @type {?string}
	 */
	#text;

	/**
	 * @param {Posotita} posotita
	 * @param {Layer[]} layer_list
	 * @param {?string} text
	 */
	constructor(posotita, layer_list, text) {
		super(Block.type_posotita);
		this.#posotita = posotita;
		this.#layer_list = layer_list;
		this.#text = text;
	}

	/**
	 * @param {Posotita} posotita
	 * @param {...(Character|string)} args
	 * @returns {PosotitaBlock}
	 */
	static build(posotita, ...args) {
		/**
		 * @type {Layer[]}
		 */
		const layer_list = [];
		/**
		 * @type {?string}
		 */
		let syllavi = null;
		args.forEach(arg => {
			if (typeof(arg) === 'string') {
				syllavi = arg;
			} else {
				layer_list.push(new Layer(arg, arg.get_default_target(posotita), 0, 0));
			}
		});
		return new PosotitaBlock(posotita, layer_list, syllavi);
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const div = super.get_div();
		div.append(this.#get_symbol_div());
		div.append(this.#get_text_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol');
		div.append(this.#get_symbol_prev_div());
		div.append(this.#get_symbol_main_div());
		div.append(this.#get_symbol_next_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_prev_div() {
		const div = document.createElement('div');
		this.#layer_list.forEach(layer => {
			div.append(layer.get_character().get_posotita_prev_span() ?? '');
		});
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_main_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol-main');
		div.append(this.#posotita.get_main_span());
		this.#layer_list.forEach(layer => {
			div.append(layer.get_posotita_main_span(this.#posotita) ?? '');
		});
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_next_div() {
		const div = document.createElement('div');
		div.append(this.#posotita.get_next_span() ?? '');
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_text_div() {
		const div = document.createElement('div');
		if (this.#text !== null) {
			let prev_margin = this.#posotita.get_prev_margin();
			this.#layer_list.forEach(layer => {
				prev_margin += layer.get_character().get_posotita_prev_margin();
			});
			div.style.marginLeft = `${prev_margin.toFixed(2)}em`;
			div.append(PosotitaBlock.#get_text_span(this.#text));
		}
		return div;
	}

	/**
	 * @param {string} text
	 * @returns {HTMLSpanElement}
	 */
	static #get_text_span(text) {
		const span = document.createElement('span');
		span.classList.add('bz-text');
		span.textContent = text;
		return span;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		/**
		 * @type {Part[]}
		 */
		const part_list = [];
		this.#posotita.move_list.forEach((move, move_index) => {
			music_context.melos_pitch += move;
			let alloiosi_steps = 0;
			this.#layer_list.forEach(layer => {
				if (layer.get_target() !== move_index)
					return;
				const character = layer.get_character();
				switch (character.type) {
					case Character.type_alloiosi:
						/**
						 * @type {Alloiosi}
						 */
						const alloiosi = character;
						alloiosi_steps += alloiosi.get_steps();
						break;
					case Character.type_fthora:
						/**
						 * @type {Fthora}
						 */
						const fthora = character;
						fthora.apply(music_context);
						break;
					case Character.type_chroa:
						/**
						 * @type {Chroa}
						 */
						const chroa = character;
						chroa.apply(music_context);
						break;
					case Character.type_isokratima:
						/**
						 * @type {Isokratima}
						 */
						const isokratima = character;
						music_context.ison_fthongos = isokratima.get_fthongos();
						break;
				}
			});
			part_list.push({
				melos_steps: music_context.klimaka.get_steps(music_context.melos_pitch) + alloiosi_steps,
				ison_steps: music_context.ison_fthongos !== null ? music_context.klimaka.get_steps(music_context.ison_fthongos.pitch) : null,
				tempo: music_context.tempo,
				beats: 1,
				block: block_index,
			});
		});
		return part_list;
	}

	/**
	 * @returns {[{index: number, beats: number}]}
	 */
	get_times() {
		/**
		 * @type {[{index: number, beats: number}]}
		 */
		const time_list = [];
		if (this.#posotita === Posotita.syneches_elafron) {
			time_list.push({index: -1, beats: 1/2 - 1});
			time_list.push({index: 0, beats: 1/2 - 1});
		}
		this.#layer_list.forEach(layer => {
			const character = layer.get_character();
			switch (character.type) {
				case Character.type_chronos:
					/**
					 * @type {Chronos}
					 */
					const chronos = character;
					time_list.push({index: layer.get_target(), beats: chronos.beats});
					break;
				case Character.type_gorgon:
					/**
					 * @type {Gorgon}
					 */
					const gorgon = character;
					gorgon.tuple.forEach((value, index) => {
						time_list.push({index: layer.get_target() + index - 1, beats: value - 1});
					});
					break;
			}
		});
		return time_list;
	}
}
