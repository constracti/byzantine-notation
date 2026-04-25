import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';
import { Gorgon } from './gorgon.js';


export class Posotita {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {number[]}
	 */
	move_list;

	/**
	 * @type {Glyph}
	 */
	glyph;

	// isotita
	static ison = new Posotita('ison', [0], new Glyph(Glyph.font_byzantina, 'a'));
	static ison_petasti = new Posotita('ison-petasti', [0], new Glyph(Glyph.font_byzantina, 'A'));
	static ison_stirigma = new Posotita('ison-stirigma', [0], new Glyph(Glyph.font_loipa, '0'));
	// anavasi
	static oligon = new Posotita('oligon', [+1], new Glyph(Glyph.font_byzantina, 's'));
	static petasti = new Posotita('petasti', [+1], new Glyph(Glyph.font_byzantina, 'S'));
	static kentimata = new Posotita('kentimata', [+1], new Glyph(Glyph.font_byzantina, 'x'));
	static oligon_kentima_kato = new Posotita('oligon-kentima-kato', [+2], new Glyph(Glyph.font_byzantina, 'd'));
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], new Glyph(Glyph.font_byzantina, 'sC'));
	static oligon_petasti = new Posotita('oligon-petasti', [+2], new Glyph(Glyph.font_byzantina, 'D'));
	static oligon_kentima_petasti = new Posotita('oligon-kentima-petasti', [+3], new Glyph(Glyph.font_byzantina, 'F'));
	static ypsili_dexia = new Posotita('ypsili-dexia', [+4], new Glyph(Glyph.font_byzantina, 'g'));
	static ypsili_aristera = new Posotita('ypsili-aristera', [+5], new Glyph(Glyph.font_loipa, 's'));
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], new Glyph(Glyph.font_byzantina, 'j'));
	static apostrofos_petasti = new Posotita('apostrofos-petasti', [-1], new Glyph(Glyph.font_byzantina, 'J'));
	static elafron = new Posotita('elafron', [-2], new Glyph(Glyph.font_byzantina, 'k'));
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], new Glyph(Glyph.font_byzantina, 'l'));
	static chamili = new Posotita('chamili', [-4], new Glyph(Glyph.font_byzantina, ';'));
	// symploki
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], new Glyph(Glyph.font_byzantina, 'v'));
	static kentimata_oligon = new Posotita('kentimata-oligon', [+1, +1], new Glyph(Glyph.font_byzantina, 'c'));
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], new Glyph(Glyph.font_byzantina, 'h'));
	static yporroi = new Posotita('yporroi', [-1, -1], new Glyph(Glyph.font_byzantina, '\''));
	// TODO center text below syneches elafron
	static ison_kentimata = new Posotita('ison-kentimata', [0, +1], new Glyph(Glyph.font_byzantina, '_'));
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], new Glyph(Glyph.font_byzantina, '-'));

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {Glyph} glyph
	 */
	constructor(name, move_list, glyph) {
		this.name = name;
		this.move_list = move_list;
		this.glyph = glyph;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		return this.get_glyph(block).get_span();
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (this === Posotita.oligon_kentimata && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, 'V'); // oligon kentimata gorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, ':'); // yporroi gorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.digorgon)
			return new Glyph(Glyph.font_loipa, 'e'); // yporroi digorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.trigorgon)
			return new Glyph(Glyph.font_loipa, 'r'); // yporroi trigorgon
		return this.glyph;
	}

	/**
	 * @returns {boolean}
	 */
	is_thin() {
		switch (this) {
			case Posotita.kentimata:
			case Posotita.apostrofos:
			case Posotita.yporroi:
				return true;
			default:
				return false;
		}
	}

	/**
	 * @returns {boolean}
	 */
	is_petasti() {
		switch (this) {
			case Posotita.ison_petasti:
			case Posotita.petasti:
			case Posotita.oligon_petasti:
			case Posotita.oligon_kentima_petasti:
			case Posotita.apostrofos_petasti:
				return true;
			default:
				return false;
		}
	}
}
