import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { Chronos } from './chronos.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 */


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
	static type_alloiosi = 'alloiosi';
	static type_fthora = 'fthora';
	static type_chroa = 'chroa';
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
	 * @returns {boolean}
	 */
	is_red() {
		return this.type === SecondaryCharacter.type_rythmos;
	}

	/**
	 * @param {AbstractBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		const span = this.get_glyph(block).get_span();
		if (this.is_red())
			span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @param {AbstractBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		switch (block.type) {
			case AbstractBlock.type_posotita:
				/**
				 * @type {PosotitaBlock}
				 */
				const posotita_block = block;
				if (posotita_block.posotita.is_thin() && this.glyph_thin !== null)
					return this.glyph_thin;
				if (posotita_block.posotita === Posotita.oligon_kentima_kato && this === SecondaryCharacter.antikenoma)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.kentimata_oligon && this === Chronos.apli)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.kentimata_oligon && this === SecondaryCharacter.antikenoma)
					return Glyph.empty;
				break;
			case AbstractBlock.type_ichos: // TODO fthora position
				if (this.glyph_thin !== null)
					return this.glyph_thin;
				break;
			case AbstractBlock.type_martyria:
				if (this.glyph_thin !== null)
					return this.glyph_thin;
				break;
		}
		return this.glyph;
	}
}
