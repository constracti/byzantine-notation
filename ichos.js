import { Glyph } from './glyph.js';


export class Ichos {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Glyph[]}
	 */
	#glyph_list;

	static protos = new Ichos('protos', [Glyph.ichos_protos]);
	static defteros = new Ichos('defteros', [Glyph.ichos_defteros]);
	static tritos = new Ichos('tritos', [Glyph.ichos_tritos]);
	static tetartos = new Ichos('tetartos', [Glyph.ichos_tetartos]);
	static plagios_protos = new Ichos('plagios-protos', [Glyph.ichos_plagios, Glyph.ichos_plagios_protos]);
	static plagios_defteros = new Ichos('plagios-defteros', [Glyph.ichos_plagios, Glyph.ichos_plagios_defteros]);
	static varys = new Ichos('varys', [Glyph.ichos_varys]);
	static plagios_tetartos = new Ichos('plagios-tetartos', [Glyph.ichos_plagios, Glyph.ichos_plagios_tetartos]);

	/**
	 * @param {string} name
	 * @param {Glyph[]} glyph_list
	 */
	constructor(name, glyph_list) {
		this.name = name;
		this.#glyph_list = glyph_list;
	}

	/**
	 * @returns {HTMLImageElement[]}
	 */
	get_img_list() {
		/**
		 * @type {HTMLImageElement[]}
		 */
		const img_list = [];
		// ichos
		const img = Glyph.ichos.get_img();
		img.classList.add(Glyph.color_red);
		img_list.push(img);
		// rest
		this.#glyph_list.forEach(glyph => {
			const img = glyph.get_img();
			img.classList.add(Glyph.color_red);
			img_list.push(img);
		});
		// return
		return img_list;
	}
}
