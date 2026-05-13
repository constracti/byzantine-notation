import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, new Glyph(Glyph.font_byzantina, 'u'));
	static apli = new Chronos('apli', 1, new Glyph(Glyph.font_byzantina, '8'));
	static dipli = new Chronos('dipli', 2, new Glyph(Glyph.font_byzantina, '9'));
	static tripli = new Chronos('tripli', 3, new Glyph(Glyph.font_byzantina, '0'));

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Glyph} glyph
	 */
	constructor(name, beats, glyph) {
		super(name, SecondaryCharacter.type_chronos, glyph);
		this.beats = beats;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.syneches_elafron)
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
		if (this === Chronos.klasma) {
			if (posotita.is_petasti()) {
				vertical_offset += 0.6;
				horizontal_offset -= 0.05;
			}
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
			if (posotita === Posotita.oligon_ypsili_dexia) {
				horizontal_offset -= 0.2;
			}
		}
		if (this === Chronos.apli) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.5;
			}
		}
		const span = super.get_main_span(posotita, horizontal_offset, vertical_offset);
		return span;
	}
}
