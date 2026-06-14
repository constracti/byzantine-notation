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
	static ison = new Posotita('ison', [0], Glyph.ison); // TODO ison and *_ison repeat alloiosi
	static oligon_ison = new Posotita('oligon-ison', [0], Glyph.oligon_ison);
	static petasti_ison = new Posotita('petasti-ison', [0], Glyph.petasti_ison);
	// anavasi
	static oligon = new Posotita('oligon', [+1], Glyph.oligon);
	static petasti = new Posotita('petasti', [+1], Glyph.petasti);
	static kentimata = new Posotita('kentimata', [+1], Glyph.kentimata);
	static oligon_kentima_kato = new Posotita('oligon-kentima-kato', [+2], Glyph.oligon_kentima_kato);
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], Glyph.oligon);
	static petasti_oligon = new Posotita('petasti-oligon', [+2], Glyph.petasti_oligon);
	static oligon_kentima = new Posotita('oligon-kentima', [+3], Glyph.oligon_kentima);
	static petasti_kentima = new Posotita('petasti-kentima', [+3], Glyph.petasti_kentima);
	static oligon_ypsili_dexia = new Posotita('oligon-ypsili-dexia', [+4], Glyph.oligon_ypsili_dexia);
	static petasti_ypsili_dexia = new Posotita('petasti-ypsili-dexia', [+4], Glyph.petasti_ypsili_dexia);
	static oligon_ypsili_aristera = new Posotita('oligon-ypsili-aristera', [+5], Glyph.oligon_ypsili_aristera);
	static petasti_kentima_ypsili_kentro = new Posotita('petasti-kentima-ypsili-kentro', [+7], Glyph.petasti_kentima_ypsili_kentro);
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], Glyph.apostrofos);
	static oligon_apostrofos = new Posotita('oligon-apostrofos', [-1], Glyph.oligon_apostrofos);
	static petasti_apostrofos = new Posotita('petasti-apostrofos', [-1], Glyph.petasti_apostrofos);
	static elafron = new Posotita('elafron', [-2], Glyph.elafron);
	static petasti_elafron = new Posotita('petasti-elafron', [-2], Glyph.petasti_elafron);
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], Glyph.elafron_apostrofos);
	static chamili = new Posotita('chamili', [-4], Glyph.chamili);
	// symploki
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], Glyph.oligon_kentimata);
	static kentimata_oligon = new Posotita('kentimata-oligon', [+1, +1], Glyph.kentimata_oligon);
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], Glyph.syneches_elafron);
	static yporroi = new Posotita('yporroi', [-1, -1], Glyph.yporroi);
	static ison_kentimata = new Posotita('ison-kentimata', [0, +1], Glyph.ison_kentimata);
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], Glyph.apostrofos_kentimata);
	static elafron_kentimata = new Posotita('elafron-kentimata', [-2, +1], Glyph.elafron_kentimata);
	static apostrofos_yporroi = new Posotita('apostrofos-yporroi', [-1, -1, -1], Glyph.apostrofos);

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
			return 0.7;
		return 0;
	}

	/**
	 * @returns {HTMLImageElement[]}
	 */
	get_main_img_list() {
		/**
		 * @type {HTMLImageElement[]}
		 */
		const img_list = [];
		img_list.push(this.#glyph.get_img());
		if (this === Posotita.apostrofos_yporroi)
			img_list.push(Glyph.yporroi.get_img())
		return img_list;
	}

	/**
	 * @returns {?HTMLImageElement}
	 */
	get_next_img() {
		if (this === Posotita.oligon_kentima_dipla)
			return Glyph.kentima.get_img();
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
