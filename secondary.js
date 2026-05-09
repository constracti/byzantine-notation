import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';


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
	glyph_thin; // TODO should null throw an error?

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_kallopismos = 'kallopismos';
	static type_alloiosi = 'alloiosi';
	static type_fthora = 'fthora';
	static type_chroa = 'chroa';
	static type_isokratima = 'ison';
	static type_rythmos = 'rythmos';

	static psifiston = new SecondaryCharacter('psifiston', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '/'), null);
	static antikenoma = new SecondaryCharacter('antikenoma', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, 'm'), new Glyph(Glyph.font_byzantina, 'M'));
	static omalon_mono = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '<'), null);
	static omalon_diplo = new SecondaryCharacter('omalon-diplo', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, ','), null);
	static syndesmos = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_loipa, '}'), null);
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

	/**
	 * @returns {?string}
	 */
	get_color() {
		if (this.type === SecondaryCharacter.type_rythmos)
			return Glyph.color_red;
		return null;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {HTMLSpanElement}
	 */
	get_span(posotita) {
		const span = this.get_glyph(posotita).get_span();
		const color = this.get_color();
		if (color !== null)
			span.classList.add(color);
		return span;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {Glyph}
	 */
	get_glyph(posotita) {
		if (posotita === Posotita.oligon_kentima_kato && this === SecondaryCharacter.antikenoma)
			return Glyph.empty;
		if (posotita === Posotita.kentimata_oligon && this === SecondaryCharacter.antikenoma)
			return Glyph.empty;
		if (posotita.is_thin() && this.glyph_thin !== null)
			return this.glyph_thin;
		return this.glyph;
	}
}
