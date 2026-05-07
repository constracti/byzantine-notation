import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_narrow;

	static klasma = new Chronos('klasma', 1, new Glyph(Glyph.font_byzantina, 'u'), new Glyph(Glyph.font_byzantina, 'i'));
	static apli = new Chronos('apli', 1, new Glyph(Glyph.font_byzantina, '8'), new Glyph(Glyph.font_byzantina, '*'));
	static dipli = new Chronos('dipli', 2, new Glyph(Glyph.font_byzantina, '9'), new Glyph(Glyph.font_byzantina, '('));
	static tripli = new Chronos('tripli', 3, new Glyph(Glyph.font_byzantina, '0'), new Glyph(Glyph.font_byzantina, ')'));

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_narrow
	 */
	constructor(name, beats, glyph_normal, glyph_narrow) {
		super(name, SecondaryCharacter.type_chronos, glyph_normal, glyph_narrow);
		this.beats = beats;
		this.#glyph_normal = glyph_normal;
		this.#glyph_narrow = glyph_narrow;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {Glyph}
	 */
	get_glyph(posotita) {
		if (posotita.is_petasti() && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I'); // klasma kato
		if (posotita === Posotita.oligon_kentima && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I'); // klasma kato
		if (posotita === Posotita.oligon_ypsili_dexia && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'U'); // klasma aristera
		if (posotita === Posotita.oligon_apostrofos && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I'); // klasma kato
		if (posotita === Posotita.kentimata_oligon && this === Chronos.apli)
			return Glyph.empty;
		return super.get_glyph(posotita);
	}
}
