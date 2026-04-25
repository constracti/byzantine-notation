import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { MartyriaFthongos } from './martyria-fthongos.js';
import { MartyrikoSimadi } from './martyriko-simadi.js';


export class MartyriaBlock extends AbstractBlock {

	/**
	 * @type {MartyriaFthongos}
	 */
	fthongos;

	/**
	 * @type {MartyrikoSimadi}
	 */
	simadi;

	/**
	 * @type {boolean}
	 */
	teleies;

	/**
	 * @param {MartyriaFthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param {boolean} teleies
	 */
	constructor(fthongos, simadi, teleies) {
		super('martyria');
		this.fthongos = fthongos;
		this.simadi = simadi;
		this.teleies = teleies;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.fthongos.get_span());
		symbol_div.append(this.simadi.get_span());
		if (this.teleies)
			symbol_div.append(MartyriaBlock.#get_teleies_span());
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
}
