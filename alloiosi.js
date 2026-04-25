import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 't'), new Glyph(Glyph.font_byzantina, 'y'));
	static yfesi_monogrammi = new Alloiosi('yfesi_monogrammi', -4, new Glyph(Glyph.font_byzantina, 'T'), new Glyph(Glyph.font_byzantina, 'Y'));

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
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
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita === Posotita.oligon_kentimata)
			return this.glyph_thin ?? this.glyph;
		return super.get_glyph(block);
	}
}
