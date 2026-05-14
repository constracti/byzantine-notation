import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';


// TODO merge simple block to abstract

export class SimpleBlock extends AbstractBlock {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Glyph}
	 */
	#glyph;

	/**
	 * @type {?string}
	 */
	#color;

	static diastoli = new SimpleBlock('diastoli', new Glyph(Glyph.font_byzantina, 'o'), null);
	static stavros = new SimpleBlock('stavros', new Glyph(Glyph.font_fthores, '\''), Glyph.color_red);

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 * @param {?string} color
	 */
	constructor(name, glyph, color) {
		super(null);
		this.name = name;
		this.#glyph = glyph;
		this.#color = color;
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
		const span = this.#glyph.get_span();
		if (this.#color !== null)
			span.classList.add(this.#color);
		div.append(span);
		return div;
	}
}
