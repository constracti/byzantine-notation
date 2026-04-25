import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';


export class SimpleBlock extends AbstractBlock {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Glyph}
	 */
	glyph;

	/**
	 * @type {?string}
	 */
	color;

	static vareia = new SimpleBlock('vareia', new Glyph(Glyph.font_byzantina, '\\'), null);
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
		this.glyph = glyph;
		this.color = color;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		const span = this.glyph.get_span();
		if (this.color !== null)
			span.classList.add(this.color);
		symbol_div.append(span);
		block_div.append(symbol_div);
		return block_div;
	}
}
