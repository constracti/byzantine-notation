import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';


export class SecondaryCharacter {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {string}
	 */
	type;

	/**
	 * @type {Glyph}
	 */
	glyph;

	/**
	 * @type {?Glyph}
	 */
	glyph_thin;

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_kallopismos = 'kallopismos';
	static type_rythmos = 'rythmos';
	static type_alloiosi = 'alloiosi';

	static psifiston = new SecondaryCharacter('psifiston', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '/'), null);
	static antikenoma = new SecondaryCharacter('antikenoma', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, 'm'), new Glyph(Glyph.font_byzantina, 'M'));
	static omalon_mono = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '<'), null);
	static omalon_diplo = new SecondaryCharacter('omalon-diplo', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, ','), null);
	static rythmos_trisimos = new SecondaryCharacter('rythmos-trisimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '6'), new Glyph(Glyph.font_fthores, '^'));
	static rythmos_tetrasimos = new SecondaryCharacter('rythmos-tetrasimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '7'), new Glyph(Glyph.font_fthores, '&'));

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, type, glyph, glyph_thin) {
		this.name = name;
		this.type = type;
		this.glyph = glyph;
		this.glyph_thin = glyph_thin;
	}

	is_red() {
		return this.type === SecondaryCharacter.type_rythmos;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		const span = this.get_glyph(block).get_span();
		if (this.is_red())
			span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita.is_thin() && this.glyph_thin !== null)
			return this.glyph_thin;
		return this.glyph;
	}
}
