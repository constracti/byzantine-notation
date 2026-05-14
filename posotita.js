import { Glyph } from './glyph.js';


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
	#glyph;

	// isotita
	static ison = new Posotita('ison', [0], new Glyph(Glyph.font_byzantina, 'a')); // TODO ison and *_ison repeat alloiosi
	static petasti_ison = new Posotita('petasti-ison', [0], new Glyph(Glyph.font_byzantina, 'A'));
	static oligon_ison = new Posotita('oligon-ison', [0], new Glyph(Glyph.font_loipa, '0'));
	// anavasi
	static oligon = new Posotita('oligon', [+1], new Glyph(Glyph.font_byzantina, 's'));
	static petasti = new Posotita('petasti', [+1], new Glyph(Glyph.font_byzantina, 'S'));
	static kentimata = new Posotita('kentimata', [+1], new Glyph(Glyph.font_byzantina, 'x'));
	static oligon_kentima_kato = new Posotita('oligon-kentima-kato', [+2], new Glyph(Glyph.font_byzantina, 'd'));
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], new Glyph(Glyph.font_byzantina, 's'));
	static petasti_oligon = new Posotita('petasti-oligon', [+2], new Glyph(Glyph.font_byzantina, 'D'));
	static oligon_kentima = new Posotita('oligon-kentima', [+3], new Glyph(Glyph.font_byzantina, 'f'));
	static petasti_kentima = new Posotita('petasti-kentima', [+3], new Glyph(Glyph.font_byzantina, 'F'));
	static oligon_ypsili_dexia = new Posotita('oligon-ypsili-dexia', [+4], new Glyph(Glyph.font_byzantina, 'g'));
	static petasti_ypsili_dexia = new Posotita('petasti-ypsili-dexia', [+4], new Glyph(Glyph.font_byzantina, 'G'));
	static oligon_ypsili_aristera = new Posotita('oligon-ypsili-aristera', [+5], new Glyph(Glyph.font_loipa, 's'));
	static petasti_kentima_ypsili_kentro = new Posotita('petasti-kentima-ypsili-kentro', [+7], new Glyph(Glyph.font_loipa, 'F'));
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], new Glyph(Glyph.font_byzantina, 'j'));
	static oligon_apostrofos = new Posotita('oligon-apostrofos', [-1], new Glyph(Glyph.font_loipa, ')'));
	static petasti_apostrofos = new Posotita('petasti-apostrofos', [-1], new Glyph(Glyph.font_byzantina, 'J'));
	static elafron = new Posotita('elafron', [-2], new Glyph(Glyph.font_byzantina, 'k'));
	static petasti_elafron = new Posotita('petasti-elafron', [-2], new Glyph(Glyph.font_byzantina, 'K'));
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], new Glyph(Glyph.font_byzantina, 'l'));
	static chamili = new Posotita('chamili', [-4], new Glyph(Glyph.font_byzantina, ';'));
	// symploki
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], new Glyph(Glyph.font_byzantina, 'v'));
	static kentimata_oligon = new Posotita('kentimata-oligon', [+1, +1], new Glyph(Glyph.font_byzantina, 'c'));
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], new Glyph(Glyph.font_byzantina, 'h'));
	static yporroi = new Posotita('yporroi', [-1, -1], new Glyph(Glyph.font_byzantina, '\''));
	static ison_kentimata = new Posotita('ison-kentimata', [0, +1], new Glyph(Glyph.font_byzantina, '_'));
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], new Glyph(Glyph.font_byzantina, '-'));
	static elafron_kentimata = new Posotita('elafron-kentimata', [-2, +1], new Glyph(Glyph.font_loipa, 'p'));
	static apostrofos_yporroi = new Posotita('apostrofos-yporroi', [-1, -1, -1], new Glyph(Glyph.font_byzantina, 'j\''));

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {Glyph} glyph
	 */
	constructor(name, move_list, glyph) {
		this.name = name;
		this.move_list = move_list;
		this.#glyph = glyph;
	}

	/**
	 * @returns {number}
	 */
	get_prev_margin() {
		if (this === Posotita.syneches_elafron)
			return 0.5;
		return 0;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_main_span() {
		const span = this.#glyph.get_span();
		span.classList.add('bz-posotita');
		return span;
	}

	/**
	 * @returns {?HTMLSpanElement}
	 */
	get_next_span() {
		if (this === Posotita.oligon_kentima_dipla)
			return new Glyph(Glyph.font_byzantina, 'C').get_span();
		return null;
	}

	/**
	 * @returns {boolean}
	 */
	is_petasti() {
		switch (this) {
			case Posotita.petasti_ison:
			case Posotita.petasti:
			case Posotita.petasti_oligon:
			case Posotita.petasti_kentima:
			case Posotita.petasti_ypsili_dexia:
			case Posotita.petasti_kentima_ypsili_kentro:
			case Posotita.petasti_apostrofos:
			case Posotita.petasti_elafron:
				return true;
			default:
				return false;
		}
	}
}
