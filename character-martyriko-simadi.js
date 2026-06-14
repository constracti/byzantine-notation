import { Glyph } from './glyph.js';
import { Character } from './character.js';

/**
 * @import {Fthongos} from './fthongos.js'
 */


export class MartyrikoSimadi extends Character {

	/**
	 * @type {boolean}
	 */
	teleies;

	static alfa = new MartyrikoSimadi('alfa', Glyph.simadi_alfa, false);
	static alfa_teleies = new MartyrikoSimadi('alfa-teleies', Glyph.simadi_alfa, true);
	static lambda = new MartyrikoSimadi('lambda', Glyph.simadi_lambda, false);
	static nana = new MartyrikoSimadi('nana', Glyph.simadi_nana, false);
	static varys = new MartyrikoSimadi('varys', Glyph.simadi_varys, false);
	static delta = new MartyrikoSimadi('delta', Glyph.simadi_delta, false);
	static delta_teleies = new MartyrikoSimadi('delta-teleies', Glyph.simadi_delta, true);
	static skliro = new MartyrikoSimadi('skliro', Glyph.simadi_skliro, false);
	static defteros = new MartyrikoSimadi('defteros', Glyph.simadi_defteros, false);
	static defteros_teleies = new MartyrikoSimadi('defteros-teleies', Glyph.simadi_defteros, true);
	static zygos = new MartyrikoSimadi('zygos', Glyph.zygos, false);

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 * @param {boolean} teleies
	 */
	constructor(name, glyph, teleies) {
		super(name, Character.type_simadi, glyph) // TODO martyriko simadi names
		this.teleies = teleies;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}

	/**
	 * 
	 * @param {Fthongos} fthongos
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLImageElement}
	 */
	get_martyria_main_img(fthongos, horizontal_offset, vertical_offset) {
		if (fthongos.diapason < 0)
			vertical_offset -= 0.7;
		if (this === MartyrikoSimadi.alfa || this === MartyrikoSimadi.alfa_teleies) {
			vertical_offset += 0.05;
		}
		if (this === MartyrikoSimadi.nana) {
			horizontal_offset += 0.1;
		}
		if (this === MartyrikoSimadi.varys) {
			horizontal_offset += 0.4;
		}
		if (this === MartyrikoSimadi.defteros || this === MartyrikoSimadi.defteros_teleies) {
			horizontal_offset += 0.15;
		}
		if (this === MartyrikoSimadi.zygos) {
			horizontal_offset += 0.6;
			vertical_offset += 1.4;
		}
		return super.get_martyria_main_img(fthongos, horizontal_offset, vertical_offset);
	}
}
