import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'e'), new Glyph(Glyph.font_byzantina, 'r'));
	static gorgon_kato = new Gorgon('gorgon-kato', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'E'), new Glyph(Glyph.font_byzantina, 'R'));
	static digorgon = new Gorgon('digorgon', [1/3, 1/3, 1/3], new Glyph(Glyph.font_loipa, '2'), new Glyph(Glyph.font_loipa, '@'));
	static trigorgon = new Gorgon('digorgon', [1/4, 1/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '6'), new Glyph(Glyph.font_loipa, '^'));

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, tuple, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_gorgon, glyph, glyph_thin);
		this.tuple = tuple;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita === Posotita.oligon_kentimata && this === Gorgon.gorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.gorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.digorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.trigorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.ison_kentimata)
			return this.glyph_thin ?? this.glyph;
		if (block.posotita === Posotita.apostrofos_kentimata)
			return this.glyph_thin ?? this.glyph;
		// TODO maybe auto select gorgon kato
		return super.get_glyph(block);
	}
}
