import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, new Glyph(Glyph.font_byzantina, 'u'), new Glyph(Glyph.font_byzantina, 'i'));
	static apli = new Chronos('apli', 1, new Glyph(Glyph.font_byzantina, '8'), new Glyph(Glyph.font_byzantina, '*'));
	static dipli = new Chronos('dipli', 2, new Glyph(Glyph.font_byzantina, '9'), new Glyph(Glyph.font_byzantina, '('));

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, beats, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_chronos, glyph, glyph_thin);
		this.beats = beats;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita.is_petasti() && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I'); // petasti kato
		if (block.posotita === Posotita.ypsili_dexia && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'U'); // klasma aristera
		return super.get_glyph(block);
	}
}
