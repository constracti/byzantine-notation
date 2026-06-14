import { Glyph } from './glyph.js';
import { Fthongos } from './fthongos.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 * @import {MusicContext} from './common.js'
 */


export class Isokratima extends Character {

	/**
	 * @type {?Fthongos}
	 */
	#fthongos;

	static melos = new Isokratima('melos', null, Glyph.isokratima_melos);

	static di_kato = new Isokratima('di-kato', Fthongos.di_kato, Glyph.isokratima_di_kato);
	static ke_kato = new Isokratima('ke-kato', Fthongos.ke_kato, Glyph.isokratima_ke_kato);
	static zo = new Isokratima('zo', Fthongos.zo, Glyph.isokratima_zo);
	static ni = new Isokratima('ni', Fthongos.ni, Glyph.isokratima_ni);
	static pa = new Isokratima('pa', Fthongos.pa, Glyph.isokratima_pa);
	static vou = new Isokratima('vou', Fthongos.vou, Glyph.isokratima_vou);
	static ga = new Isokratima('ga', Fthongos.ga, Glyph.isokratima_ga);
	static di = new Isokratima('di', Fthongos.di, Glyph.isokratima_di);
	static ke = new Isokratima('ke', Fthongos.ke, Glyph.isokratima_ke);
	static zo_ano = new Isokratima('zo-ano', Fthongos.zo_ano, Glyph.isokratima_zo_ano);

	/**
	 * @param {string} name
	 * @param {?Fthongos} fthongos
	 * @param {Glyph} glyph
	 */
	constructor(name, fthongos, glyph) {
		super(name, Character.type_isokratima, glyph);
		this.#fthongos = fthongos;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_blue;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @param {number} target
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLImageElement}
	 */
	get_posotita_main_img(block, target, horizontal_offset, vertical_offset) {
		const posotita = block.get_posotita();
		if (posotita === Posotita.apostrofos) {
			horizontal_offset += 0.5;
		}
		if (posotita === Posotita.oligon_ypsili_aristera) {
			horizontal_offset += 0.3;
		}
		return super.get_posotita_main_img(block, target, horizontal_offset, vertical_offset);
	}
	
	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		music_context.ison_fthongos = this.#fthongos;
	}
}
