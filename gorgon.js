import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @typedef {import('./block-posotita.js').PosotitaBlock} PosotitaBlock
 */


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
				if (posotita_block.posotita === Posotita.oligon_kentimata && this === Gorgon.gorgon)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.yporroi && this === Gorgon.gorgon)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.yporroi && this === Gorgon.digorgon)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.yporroi && this === Gorgon.trigorgon)
					return Glyph.empty;
				if (posotita_block.posotita === Posotita.ison_kentimata)
					return this.glyph_thin ?? this.glyph;
				if (posotita_block.posotita === Posotita.apostrofos_kentimata)
					return this.glyph_thin ?? this.glyph;
				if (posotita_block.posotita === Posotita.elafron_kentimata)
					return this.glyph_thin ?? this.glyph;
				// TODO maybe auto select gorgon kato
				break;
		}
		return super.get_glyph(block);
	}
}
