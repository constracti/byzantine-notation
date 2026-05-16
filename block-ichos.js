import { Block } from './block.js';
import { Klimaka } from './klimaka.js';
import { Layer } from './layer.js';

/**
 * @import {Vathmida} from './vathmida.js'
 * @import {Fthora} from './fthora.js'
 * @import {Ichos} from './ichos.js'
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */


export class IchosBlock extends Block {

	/**
	 * @type {Ichos}
	 */
	#ichos;

	/**
	 * @type {Vathmida}
	 */
	#vathmida;

	/**
	 * @type {Fthora}
	 */
	#fthora;

	/**
	 * @param {Ichos} ichos
	 * @param {Vathmida} vathmida
	 * @param {Fthora} fthora
	 */
	constructor(ichos, vathmida, fthora) {
		super(Block.type_ichos);
		this.#ichos = ichos;
		this.#vathmida = vathmida;
		this.#fthora = fthora;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const div = super.get_div();
		div.append(this.#get_symbol_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol');
		div.append(this.#get_symbol_main_div());
		return div;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	#get_symbol_main_div() {
		const div = document.createElement('div');
		div.classList.add('bz-symbol-main');
		div.append(...this.#ichos.get_span_list());
		div.append(this.#vathmida.get_ichos_span());
		const layer = new Layer(this.#fthora, 0, 0, 0);
		div.append(layer.get_ichos_main_span(this.#vathmida));
		return div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.melos_pitch = this.#vathmida.pitch;
		music_context.ison_fthongos = null;
		music_context.klimaka = Klimaka.get_default();
		this.#fthora.apply(music_context);
		return [];
	}
}
