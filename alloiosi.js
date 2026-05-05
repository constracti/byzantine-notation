import { Glyph } from './glyph.js';
import { AbstractBlock } from './block-abstract.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';

/**
 * @typedef {import('./block-posotita.js').PosotitaBlock} PosotitaBlock
 */


export class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 't'), new Glyph(Glyph.font_byzantina, 'y'));
	static yfesi_monogrammi = new Alloiosi('yfesi_monogrammi', -4, new Glyph(Glyph.font_byzantina, 'T'), new Glyph(Glyph.font_byzantina, 'Y'));

	static diesi_apli = new Alloiosi('diesi-apli', +2, new Glyph(Glyph.font_fthores, 'b'), new Glyph(Glyph.font_fthores, 'n'));

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Glyph} glyph
	 * @param {Glyph} glyph_thin
	 */
	constructor(name, steps, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_alloiosi, glyph, glyph_thin);
		this.steps = steps;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
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
				if (posotita_block.posotita === Posotita.oligon_kentimata)
					return this.glyph_thin ?? this.glyph;
				break;
		}
		return super.get_glyph(block);
	}
}
