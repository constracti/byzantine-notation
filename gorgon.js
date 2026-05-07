import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { SecondaryCharacter } from './secondary.js';


export class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_narrow;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'e'), new Glyph(Glyph.font_byzantina, 'r'));
	static gorgon_kato = new Gorgon('gorgon-kato', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'E'), new Glyph(Glyph.font_byzantina, 'R'));
	static gorgon_prin = new Gorgon('gorgon-prin', [2/3, 1/3], new Glyph(Glyph.font_loipa, '`'), new Glyph(Glyph.font_loipa, '~'));
	static gorgon_meta = new Gorgon('gorgon-meta', [1/3, 2/3], new Glyph(Glyph.font_loipa, '1'), new Glyph(Glyph.font_loipa, '!'));
	static digorgon = new Gorgon('digorgon', [1/3, 1/3, 1/3], new Glyph(Glyph.font_loipa, '2'), new Glyph(Glyph.font_loipa, '@'));
	static digorgon_prin = new Gorgon('digorgon-prin', [2/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '3'), new Glyph(Glyph.font_loipa, '#'));
	static digorgon_mesi = new Gorgon('digorgon-mesi', [1/4, 2/4, 1/4], new Glyph(Glyph.font_loipa, '4'), new Glyph(Glyph.font_loipa, '$'));
	static digorgon_meta = new Gorgon('digorgon-meta', [1/4, 1/4, 2/4], new Glyph(Glyph.font_loipa, '5'), new Glyph(Glyph.font_loipa, '%'));
	static trigorgon = new Gorgon('trigorgon', [1/4, 1/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '6'), new Glyph(Glyph.font_loipa, '^'));

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_narrow
	 */
	constructor(name, tuple, glyph_normal, glyph_narrow) {
		super(name, SecondaryCharacter.type_gorgon, glyph_normal, glyph_narrow);
		this.tuple = tuple;
		this.#glyph_normal = glyph_normal;
		this.#glyph_narrow = glyph_narrow;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {Glyph}
	 */
	get_glyph(posotita) {
		if (posotita === Posotita.oligon_kentimata && this === Gorgon.gorgon)
			return Glyph.empty;
		if (posotita === Posotita.yporroi && this === Gorgon.gorgon)
			return Glyph.empty;
		if (posotita === Posotita.yporroi && this === Gorgon.digorgon)
			return Glyph.empty;
		if (posotita === Posotita.yporroi && this === Gorgon.trigorgon)
			return Glyph.empty;
		if (posotita === Posotita.ison_kentimata)
			return this.#glyph_narrow;
		if (posotita === Posotita.apostrofos_kentimata)
			return this.#glyph_narrow;
		if (posotita === Posotita.elafron_kentimata)
			return this.#glyph_narrow;
		// TODO maybe auto select gorgon kato
		return super.get_glyph(posotita);
	}
}
