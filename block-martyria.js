import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { SecondaryLayer } from './secondary-layer.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @import {Fthongos} from './fthongos.js'
 * @import {Fthora} from './fthora.js'
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
	 * @type {SecondaryLayer[]}
	 */
	#secondary_list;

	/**
	 * @param {Fthongos} fthongos
	 * @param {SecondaryLayer[]} secondary_list
	 */
	constructor(fthongos, secondary_list) {
		super(AbstractBlock.type_martyria);
		this.#fthongos = fthongos;
		this.#secondary_list = secondary_list;
	}

	/**
	 * @param {Fthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param  {...SecondaryCharacter} args
	 * @returns {MartyriaBlock}
	 */
	static build(fthongos, simadi, ...args) {
		/**
		 * @type {SecondaryLayer[]}
		 */
		const secondary_list = [];
		secondary_list.push(new SecondaryLayer(simadi, 0, 0, 0));
		args.forEach(arg => {
			secondary_list.push(new SecondaryLayer(arg, 0, 0, 0));
		});
		return new MartyriaBlock(fthongos, secondary_list);
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
		this.#secondary_list.forEach(secondary => {
			const span = secondary.get_main_span(this.#fthongos);
			if (span !== null)
				symbol_main_div.append(span);
		});
		symbol_div.append(symbol_main_div);
		// if (this.#fthongos.diapason >= 0)
		// 	symbol_div.append(this.#simadi.get_normal_span());
		// else
		// 	symbol_div.append(this.#simadi.get_flipped_span());
		// if (this.#simadi.teleies)
		// 	symbol_div.append(MartyriaBlock.#get_teleies_span());
		// if (this.#fthora !== null)
		// 	symbol_div.append(this.#fthora.get_martyria_span());
		// if (this.#agogi !== null)
		// 	symbol_div.append(this.#agogi.get_martyria_span());
		// for (let diapason = 1; diapason <= this.#fthongos.diapason; diapason++)
		// 	symbol_div.append(MartyriaBlock.#get_tonos_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_teleies_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '`');
		const span = glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
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
		this.#secondary_list.forEach(secondary => {
			const character = secondary.get_character();
			if (character.type === SecondaryCharacter.type_fthora) {
				/**
				 * @type {Fthora}
				 */
				const fthora = character;
				fthora.apply(music_context);
			}
		});
		// if (this.#agogi !== null)
		// 	music_context.tempo = this.#agogi.tempo;
		return [];
	}
}
