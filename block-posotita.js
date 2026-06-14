import { Block } from './block.js';
import { Posotita } from './posotita.js';
import { Layer } from './layer.js';
import { Character } from './character.js';

/**
 * @import {Chronos} from './character-chronos.js'
 * @import {Gorgon} from './character-gorgon.js'
 * @import {Alloiosi} from './character-alloiosi.js'
 * @import {Fthora} from './character-fthora.js'
 * @import {Chroa} from './character-chroa.js'
 * @import {Isokratima} from './character-isokratima.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


// TODO drop-cap block

export class PosotitaBlock extends Block {

	/**
	 * @type {Posotita}
	 */
	#posotita;

	/**
	 * @type {Map<string, Character>[]}
	 */
	#character_map_list;

	/**
	 * @type {Layer[]}
	 */
	#layer_list;

	/**
	 * @type {?string}
	 */
	#text;

	/**
	 * @type {?PosotitaBlock}
	 */
	#previous_block;

	/**
	 * @param {Posotita} posotita
	 * @param {Map<string, Character>[]} character_map_list
	 * @param {Layer[]} layer_list
	 * @param {?string} text
	 */
	constructor(posotita, character_map_list, layer_list, text) {
		super(Block.type_posotita);
		this.#posotita = posotita;
		this.#character_map_list = character_map_list;
		this.#layer_list = layer_list;
		this.#text = text;
		this.#previous_block = null;
	}

	/**
	 * @param {Posotita} posotita
	 * @param {...(Character|string)} args
	 * @returns {PosotitaBlock}
	 */
	static build(posotita, ...args) {
		/**
		 * @type {Map<string, Character>[]}
		 */
		const character_map_list = posotita.move_list.map(move => new Map());
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
				if (arg.type !== null)
					character_map_list[arg.get_default_target(posotita)].set(arg.type, arg);
				layer_list.push(new Layer(arg, arg.get_default_target(posotita), 0, 0));
			}
		});
		return new PosotitaBlock(posotita, character_map_list, layer_list, syllavi);
	}

	/**
	 * @type {Posotita}
	 */
	get_posotita() {
		return this.#posotita;
	}

	/**
	 * @returns {?PosotitaBlock}
	 */
	get_previous_block() {
		return this.#previous_block;
	}

	/**
	 * @param {?PosotitaBlock} block
	 */
	set_previous_block(block) {
		this.#previous_block = block;
	}

	/**
	 * @param {number} target
	 * @returns {?Chronos}
	 */
	#get_chronos(target) {
		return this.#character_map_list[target].get(Character.type_chronos) ?? null;
	}

	/**
	 * @param {number} target
	 * @returns {?Gorgon}
	 */
	#get_gorgon(target) {
		return this.#character_map_list[target].get(Character.type_gorgon) ?? null;
	}

	/**
	 * @param {number} target
	 * @returns {?Alloiosi}
	 */
	#get_alloiosi(target) {
		return this.#character_map_list[target].get(Character.type_alloiosi) ?? null;
	}

	/**
	 * @param {number} target
	 * @returns {?Fthora}
	 */
	#get_fthora(target) {
		return this.#character_map_list[target].get(Character.type_fthora) ?? null;
	}

	/**
	 * @param {number} target
	 * @returns {?Chroa}
	 */
	#get_chroa(target) {
		return this.#character_map_list[target].get(Character.type_chroa) ?? null;
	}

	/**
	 * @param {number} target
	 * @returns {?Isokratima}
	 */
	#get_isokratima(target) {
		return this.#character_map_list[target].get(Character.type_isokratima) ?? null;
	}

	/**
	 * @returns {boolean}
	 */
	has_kallopismos() {
		let value = false;
		this.#layer_list.forEach(layer => {
			switch (layer.get_character()) {
				case Character.antikenoma:
				case Character.omalon_mono:
				case Character.omalon_diplo:
				case Character.syndesmos:
					value = true;
					break;
			}
		});
		return value;
	}

	/**
	 * keep gorgon over simple character on the next block
	 * @returns {boolean}
	 */
	keep_gorgon_over_simple() {
		return this.#posotita.is_petasti()
			|| this.#layer_list.some(layer => layer.get_character() === Character.vareia)
			|| this.#layer_list.some(layer => layer.get_character() === Character.antikenoma)
			;
	}

	/**
	 * keep gorgon over apostrofos on the next block
	 * @returns {boolean}
	 */
	keep_gorgon_over_apostrofos() {
		return this.#posotita === Posotita.apostrofos || this.#posotita === Posotita.syneches_elafron;
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
		div.append(this.#posotita.get_next_img() ?? '');
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_prev_div() {
		const div = document.createElement('div');
		this.#layer_list.forEach(layer => {
			div.append(layer.get_character().get_posotita_prev_img() ?? '');
		});
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_main_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol-main');
		div.append(...this.#posotita.get_main_img_list());
		this.#layer_list.forEach(layer => {
			div.append(layer.get_posotita_main_img(this) ?? '');
		});
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
	 * @returns {boolean}
	 */
	keep_with_previous() {
		if (this.#posotita === Posotita.syneches_elafron)
			return true;
		let keep = false;
		this.#layer_list.forEach(layer => {
			const character = layer.get_character();
			if (character === Character.omalon_diplo)
				keep = true;
			if (character === Character.syndesmos)
				keep = true;
		});
		if (keep)
			return true;
		if (this.#get_gorgon(0))
			return true;
		return super.keep_with_previous();
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
			const alloiosi_steps = this.#get_alloiosi(move_index)?.get_steps() ?? 0;
			this.#get_fthora(move_index)?.apply(music_context);
			this.#get_chroa(move_index)?.apply(music_context);
			this.#get_isokratima(move_index)?.apply(music_context);
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
		this.#posotita.move_list.forEach((move, move_index) => {
			const chronos = this.#get_chronos(move_index);
			if (chronos !== null) {
				time_list.push({index: move_index, beats: chronos.beats});
			}
			const gorgon = this.#get_gorgon(move_index);
			if (gorgon !== null) {
				gorgon.tuple.forEach((value, index) => {
					time_list.push({index: move_index + index - 1, beats: value - 1});
				});
			}
		});
		return time_list;
	}
}
