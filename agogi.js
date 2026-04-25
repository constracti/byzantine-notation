import { Glyph } from './glyph.js';


export class Agogi {

	/**
	 * @type {name}
	 */
	name;

	/**
	 * @type {number}
	 */
	tempo;

	/**
	 * @type {Glyph}
	 */
	primary_glyph;

	/**
	 * @type {Glyph}
	 */
	secondary_glyph;

	static metria = new Agogi('metria', 120, new Glyph(Glyph.font_chronos, 'k'), new Glyph(Glyph.font_chronos, 'K'));
	static tacheia = new Agogi('tacheia', 180, new Glyph(Glyph.font_chronos, 'l'), new Glyph(Glyph.font_chronos, 'L'));

	/**
	 * @param {string} name
	 * @param {number} tempo
	 * @param {Glyph} primary_glyph
	 * @param {Glyph} secondary_glyph
	 */
	constructor(name, tempo, primary_glyph, secondary_glyph) {
		this.name = name;
		this.tempo = tempo;
		this.primary_glyph = primary_glyph;
		this.secondary_glyph = secondary_glyph;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_primary_span() {
		const span = this.primary_glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_secondary_span() {
		const span = this.secondary_glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}
}
