import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { SecondaryLayer } from './secondary-layer.js';
import { SecondaryCharacter } from './secondary.js';

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


export class PosotitaBlock extends AbstractBlock {

	/**
	 * @type {Posotita}
	 */
	#posotita;

	/**
	 * @type {SecondaryLayer[]}
	 */
	#secondary_list = [];

	/**
	 * @type {?string}
	 */
	#syllavi;

	/**
	 * @param {Posotita} posotita
	 * @param {SecondaryLayer[]} secondary_list
	 * @param {?string} syllavi
	 */
	constructor(posotita, secondary_list, syllavi) {
		super(AbstractBlock.type_posotita);
		this.#posotita = posotita;
		this.#secondary_list = secondary_list;
		this.#syllavi = syllavi;
	}

	/**
	 * @param {Posotita} posotita
	 * @param {...(SecondaryCharacter|string)} args
	 * @returns {PosotitaBlock}
	 */
	static build(posotita, ...args) {
		/**
		 * @type {SecondaryLayer[]}
		 */
		const secondary_list = [];
		/**
		 * @type {?string}
		 */
		let syllavi = null;
		args.forEach(arg => {
			if (typeof(arg) === 'string') {
				syllavi = arg;
			} else {
				secondary_list.push(new SecondaryLayer(arg, arg.get_default_target(posotita), 0, 0));
			}
		});
		return new PosotitaBlock(posotita, secondary_list, syllavi);
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		const symbol_prev_div = document.createElement('div');
		symbol_prev_div.classList.add('bz-symbol-prev');
		let prev_margin = this.#posotita.get_prev_margin();
		this.#secondary_list.forEach(secondary => {
			const span = secondary.get_prev_span();
			if (span !== null)
				symbol_prev_div.append(span);
			prev_margin += secondary.get_prev_margin();
		});
		const symbol_main_div = document.createElement('div');
		symbol_main_div.classList.add('bz-symbol-main');
		symbol_main_div.append(this.#posotita.get_main_span());
		this.#secondary_list.forEach(secondary => {
			const span = secondary.get_main_span(this.#posotita);
			if (span !== null)
				symbol_main_div.append(span);
		});
		const symbol_next_div = document.createElement('div');
		symbol_next_div.classList.add('bz-symbol-next');
		const next_span = this.#posotita.get_next_span();
		if (next_span !== null)
			symbol_next_div.append(next_span);
		symbol_div.append(symbol_prev_div, symbol_main_div, symbol_next_div);
		block_div.append(symbol_div);
		if (this.#syllavi !== null) {
			const text_row_div = document.createElement('div');
			text_row_div.style.marginLeft = `${prev_margin.toFixed(2)}em`;
			const text_span = document.createElement('span');
			text_span.classList.add('bz-text');
			text_span.textContent = this.#syllavi;
			text_row_div.append(text_span);
			block_div.append(text_row_div);
		}
		return block_div;
	}

	/**
	 * @param {string} syllavi
	 * @returns {HTMLSpanElement}
	 */
	static #get_syllavi_span(syllavi) {
		const span = document.createElement('span');
		span.classList.add('bz-text');
		span.textContent = syllavi;
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
			this.#secondary_list.forEach(secondary => {
				if (secondary.get_target() !== move_index)
					return;
				const character = secondary.get_character();
				switch (character.type) {
					case SecondaryCharacter.type_alloiosi:
						/**
						 * @type {Alloiosi}
						 */
						const alloiosi = character;
						alloiosi_steps += alloiosi.get_steps();
						break;
					case SecondaryCharacter.type_isokratima:
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
		// if (this.fthora !== null)
		// 	this.fthora.apply(music_context);
		// if (this.chroa !== null)
		// 	this.chroa.apply(music_context);
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
		this.#secondary_list.forEach(secondary => {
			const character = secondary.get_character();
			switch (character.type) {
				case SecondaryCharacter.type_chronos:
					/**
					 * @type {Chronos}
					 */
					const chronos = character;
					time_list.push({index: secondary.get_target(), beats: chronos.beats});
					break;
				case SecondaryCharacter.type_gorgon:
					/**
					 * @type {Gorgon}
					 */
					const gorgon = character;
					gorgon.tuple.forEach((value, index) => {
						time_list.push({index: secondary.get_target() + index - 1, beats: value - 1});
					});
					break;
			}
		});
		return time_list;
	}
}
