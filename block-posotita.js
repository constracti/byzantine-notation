import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';
import { Chronos } from './chronos.js';
import { Gorgon } from './gorgon.js';
import { Alloiosi } from './alloiosi.js';


export class PosotitaBlock extends AbstractBlock {

	/**
	 * @type {Posotita}
	 */
	posotita;

	/**
	 * @type {SecondaryCharacter[]}
	 */
	secondary_list;

	/**
	 * @type {?Chronos}
	 */
	chronos = null;

	/**
	 * @type {?Gorgon}
	 */
	gorgon = null;

	/**
	 * @type {?SecondaryCharacter}
	 */
	kallopismos = null;

	/**
	 * @type {?Alloiosi}
	 */
	alloiosi = null;

	/**
	 * @type {?SecondaryCharacter}
	 */
	rythmos = null;

	/**
	 * @type {?string}
	 */
	syllavi;

	/**
	 * @param {Posotita} posotita
	 * @param {SecondaryCharacter[]} secondary_list
	 * @param {?string} syllavi
	 */
	constructor(posotita, secondary_list, syllavi) {
		super(AbstractBlock.type_posotita);
		this.posotita = posotita;
		this.secondary_list = secondary_list;
		secondary_list.forEach(secondary => {
			switch (secondary.type) {
				case SecondaryCharacter.type_chronos:
					this.chronos = secondary;
					break;
				case SecondaryCharacter.type_gorgon:
					this.gorgon = secondary;
					break;
				case SecondaryCharacter.type_kallopismos:
					this.kallopismos = secondary;
					break;
				case SecondaryCharacter.type_alloiosi:
					this.alloiosi = secondary;
					break;
				case SecondaryCharacter.type_rythmos:
					this.rythmos = secondary;
					break;
			}
		});
		this.syllavi = syllavi;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.posotita.get_span(this));
		this.secondary_list.forEach(secondary => {
			symbol_div.append(secondary.get_span(this));
		});
		block_div.append(symbol_div);
		if (this.syllavi !== null)
			block_div.append(PosotitaBlock.#get_syllavi_span(this.syllavi));
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
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		/**
		 * @type {Part[]}
		 */
		const part_list = [];
		this.posotita.move_list.forEach(move => {
			music_context.pitch += move;
			part_list.push({
				pitch: music_context.pitch,
				steps: 0,
				tempo: music_context.tempo,
				beats: 1,
				block: block_index,
			});
		});
		if (this.alloiosi !== null) {
			if (part_list.length >= 1)
				part_list[part_list.length - 1].steps += this.alloiosi.steps;
		}
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
		if (this.posotita === Posotita.syneches_elafron) {
			time_list.push({index: -1, beats: 1/2 - 1});
			time_list.push({index: 0, beats: 1/2 - 1});
		}
		if (this.chronos !== null) {
			time_list.push({index: this.posotita.move_list.length - 1, beats: this.chronos.beats});
		}
		if (this.gorgon !== null) {
			if (this.posotita === Posotita.yporroi) {
				this.gorgon.tuple.forEach((value, index) => {
					time_list.push({index: index - 1, beats: value - 1});
				})
			} else {
				this.gorgon.tuple.forEach((value, index) => {
					time_list.push({index: this.posotita.move_list.length - 1 + index - 1, beats: value - 1});
				})
			}
		}
		return time_list;
	}
}
