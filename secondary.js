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

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_kallopismos = 'kallopismos';
	static type_alloiosi = 'alloiosi';
	static type_fthora = 'fthora';
	static type_chroa = 'chroa';
	static type_isokratima = 'ison';
	static type_rythmos = 'rythmos';
	static type_simadi = 'simadi';

	static vareia = new SecondaryCharacter('vareia', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '\\'));
	static psifiston = new SecondaryCharacter('psifiston', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '/'));
	static antikenoma = new SecondaryCharacter('antikenoma', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, 'm'));
	static omalon_mono = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '<'));
	static omalon_diplo = new SecondaryCharacter('omalon-diplo', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, ','));
	static syndesmos = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_loipa, '}'));
	static rythmos_trisimos = new SecondaryCharacter('rythmos-trisimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '6'));
	static rythmos_tetrasimos = new SecondaryCharacter('rythmos-tetrasimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '7'));

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {Glyph} glyph
	 */
	constructor(name, type, glyph) {
		this.name = name;
		this.type = type;
		this.glyph = glyph;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		return 0;
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
	 * @returns {?HTMLSpanElement}
	 */
	get_prev_span() {
		if (this === SecondaryCharacter.vareia)
			return this.glyph.get_span();
		return null;
	}

	/**
	 * @returns {number}
	 */
	get_prev_margin() {
		if (this === SecondaryCharacter.vareia)
			return 0.5;
		return 0;
	}

	/**
	 * @param {*} primary
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLSpanElement}
	 */
	get_main_span(primary, horizontal_offset, vertical_offset) {
		if (this === SecondaryCharacter.vareia)
			return null;
		if (this === SecondaryCharacter.antikenoma) {
			if (primary === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
		}
		if (this === SecondaryCharacter.omalon_mono) {
			horizontal_offset -= 0.2;
		}
		if (this.type === SecondaryCharacter.type_rythmos) {
			if (primary === Posotita.petasti_oligon) {
				vertical_offset -= 0.2;
			}
		}
		const span = this.glyph.get_span();
		span.style.position = 'absolute';
		const color = this.get_color();
		if (color !== null)
			span.classList.add(color);
		span.style.width = '0.1em';
		horizontal_offset += 0.1;
		vertical_offset -= 0.2;
		span.style.right = `${-horizontal_offset.toFixed(2)}em`;
		span.style.bottom = `${-vertical_offset.toFixed(2)}em`;
		return span;
	}
}
