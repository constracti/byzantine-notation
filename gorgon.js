import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'e'));
	static gorgon_kato = new Gorgon('gorgon-kato', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'E'));// TODO maybe auto select
	static gorgon_prin = new Gorgon('gorgon-prin', [2/3, 1/3], new Glyph(Glyph.font_loipa, '`'));
	static gorgon_meta = new Gorgon('gorgon-meta', [1/3, 2/3], new Glyph(Glyph.font_loipa, '1'));
	static digorgon = new Gorgon('digorgon', [1/3, 1/3, 1/3], new Glyph(Glyph.font_loipa, '2'));
	static digorgon_prin = new Gorgon('digorgon-prin', [2/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '3'));
	static digorgon_mesi = new Gorgon('digorgon-mesi', [1/4, 2/4, 1/4], new Glyph(Glyph.font_loipa, '4'));
	static digorgon_meta = new Gorgon('digorgon-meta', [1/4, 1/4, 2/4], new Glyph(Glyph.font_loipa, '5'));
	static trigorgon = new Gorgon('trigorgon', [1/4, 1/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '6'));

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Glyph} glyph
	 */
	constructor(name, tuple, glyph) {
		super(name, SecondaryCharacter.type_gorgon, glyph);
		this.tuple = tuple;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.apostrofos_kentimata)
			return 1;
		if (posotita === Posotita.apostrofos_yporroi)
			return 1;
		if (posotita === Posotita.ison_kentimata)
			return 1;
		if (posotita === Posotita.oligon_kentimata)
			return 1;
		return super.get_default_target(posotita);
	}

	/**
	 * @param {Posotita} posotita
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLSpanElement}
	 */
	get_main_span(posotita, horizontal_offset, vertical_offset) {
		if (this === Gorgon.gorgon) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.3;
			}
			if (posotita === Posotita.apostrofos_kentimata) {
				horizontal_offset += 0.2;
				vertical_offset -= 0.2;
			}
			if (posotita === Posotita.apostrofos_yporroi) {
				horizontal_offset += 0.6;
			}
			if (posotita === Posotita.ison_kentimata) {
				horizontal_offset += 0.2;
				vertical_offset -= 0.2;
			}
			if (posotita === Posotita.oligon_kentimata) {
				vertical_offset -= 0.2;
			}
			if (posotita === Posotita.yporroi) {
				horizontal_offset += 0.6;
			}
		}
		if (this === Gorgon.gorgon_kato) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.3;
			}
		}
		if (this === Gorgon.digorgon) {
			if (posotita === Posotita.yporroi) {
				horizontal_offset += 0.6;
				vertical_offset += 0.1;
			}
		}
		if (this === Gorgon.trigorgon) {
			if (posotita === Posotita.yporroi) {
				horizontal_offset += 0.6;
				vertical_offset += 0.1;
			}
		}
		const span = super.get_main_span(posotita, horizontal_offset, vertical_offset);
		return span;
	}
}
