import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_narrow;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 't'), new Glyph(Glyph.font_byzantina, 'y'));
	static yfesi_monogrammi = new Alloiosi('yfesi-monogrammi', -4, new Glyph(Glyph.font_byzantina, 'T'), new Glyph(Glyph.font_byzantina, 'Y'));
	static yfesi_digrammi = new Alloiosi('yfesi-digrammi', -6, new Glyph(Glyph.font_fthores, 't'), new Glyph(Glyph.font_fthores, 'y'));

	static diesi_apli = new Alloiosi('diesi-apli', +2, new Glyph(Glyph.font_fthores, 'b'), new Glyph(Glyph.font_fthores, 'n'));
	static diesi_monogrammi = new Alloiosi('diesi-monogrammi', +4, new Glyph(Glyph.font_byzantina, 'b'), new Glyph(Glyph.font_byzantina, 'n'));
	static diesi_digrammi = new Alloiosi('diesi-digrammi', +6, new Glyph(Glyph.font_byzantina, 'B'), new Glyph(Glyph.font_byzantina, 'N'));

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_narrow
	 */
	constructor(name, steps, glyph_normal, glyph_narrow) {
		super(name, SecondaryCharacter.type_alloiosi, glyph_normal, glyph_narrow);
		this.steps = steps;
		this.#glyph_normal = glyph_normal;
		this.#glyph_narrow = glyph_narrow;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {Glyph}
	 */
	get_glyph(posotita) {
		if (posotita === Posotita.oligon_kentimata && this === Alloiosi.yfesi_apli)
			return this.#glyph_narrow;
		return super.get_glyph(posotita);
	}
}
