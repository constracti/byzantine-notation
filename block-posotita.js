import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { Chroa } from './chroa.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @import {Chronos} from './chronos.js'
 * @import {Gorgon} from './gorgon.js'
 * @import {Alloiosi} from './alloiosi.js'
 * @import {Fthora} from './fthora.js'
 * @import {Chroa} from './chroa.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class PosotitaBlock extends AbstractBlock {

	/**
	 * @type {Posotita}
	 */
	posotita;

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
	 * @type {?Fthora}
	 */
	fthora = null;

	/**
	 * @type {?Chroa}
	 */
	chroa = null;

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
	 * @param {(SecondaryCharacter|string)[]} args
	 */
	constructor(posotita, ...args) {
		super(AbstractBlock.type_posotita);
		this.posotita = posotita;
		args.forEach(arg => {
			if (typeof(arg) === 'string') {
				this.syllavi = arg;
			} else {
				switch (arg.type) {
					case SecondaryCharacter.type_chronos:
						this.chronos = arg;
						break;
					case SecondaryCharacter.type_gorgon:
						this.gorgon = arg;
						break;
					case SecondaryCharacter.type_kallopismos:
						this.kallopismos = arg;
						break;
					case SecondaryCharacter.type_alloiosi:
						this.alloiosi = arg;
						break;
					case SecondaryCharacter.type_fthora:
						this.fthora = arg;
						break;
					case SecondaryCharacter.type_chroa:
						this.chroa = arg;
						break;
					case SecondaryCharacter.type_rythmos:
						this.rythmos = arg;
						break;
				}
			}
		});
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.posotita.get_span(this));
		[this.chronos, this.gorgon, this.kallopismos, this.alloiosi, this.fthora, this.chroa, this.rythmos].forEach(secondary => {
			if (secondary === null)
				return;
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
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		/**
		 * @type {Part[]}
		 */
		const part_list = [];
		this.posotita.move_list.forEach(move => {
			music_context.pitch += move;
			part_list.push({
				steps: music_context.klimaka.get_steps(music_context.pitch),
				tempo: music_context.tempo,
				beats: 1,
				block: block_index,
			});
		});
		if (this.alloiosi !== null) {
			if (part_list.length >= 1)
				part_list[part_list.length - 1].steps += this.alloiosi.steps;
		}
		if (this.fthora !== null)
			this.fthora.apply(music_context);
		if (this.chroa !== null)
			this.chroa.apply(music_context);
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
			if (this.posotita === Posotita.yporroi || this.posotita === Posotita.kentimata_oligon) {
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
