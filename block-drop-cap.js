import { Block } from './block.js';


export class DropCapBlock extends Block {

	/**
	 * @type {string}
	 */
	#drop_cap;

	/**
	 * @param {string} drop_cap
	 */
	constructor(drop_cap) {
		super(Block.type_drop_cap);
		this.#drop_cap = drop_cap;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const div = super.get_div();
		div.classList.add('bz-drop-cap');
		div.append(this.#get_text_span());
		return div;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	#get_text_span() {
		const span = document.createElement('span');
		span.textContent = this.#drop_cap;
		return span;
	}
}
