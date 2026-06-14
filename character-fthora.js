import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';
import { Genos } from './genos.js';
import { Fthongos } from './fthongos.js';
import { Klimaka } from './klimaka.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 * @import {MusicContext} from './common.js'
 */


export class Fthora extends Character {

	/**
	 * @type {Genos}
	 */
	#genos;

	/**
	 * @type {Fthongos}
	 */
	#fthongos;

	static diatoniki_ni = new Fthora('diatoniki-ni', Genos.diatoniko, Fthongos.ni, Glyph.diatoniki_ni);
	static diatoniki_pa = new Fthora('diatoniki-pa', Genos.diatoniko, Fthongos.pa, Glyph.diatoniki_pa);
	static diatoniki_vou = new Fthora('diatoniki-vou', Genos.diatoniko, Fthongos.vou, Glyph.diatoniki_vou);
	static diatoniki_ga = new Fthora('diatoniki-ga', Genos.diatoniko, Fthongos.ga, Glyph.diatoniki_ga);
	static diatoniki_di = new Fthora('diatoniki-di', Genos.diatoniko, Fthongos.di, Glyph.diatoniki_di);
	static diatoniki_ke = new Fthora('diatoniki-ke', Genos.diatoniko, Fthongos.ke, Glyph.diatoniki_ke);
	static malaki_di = new Fthora('malaki-di', Genos.chromatiko_malako, Fthongos.di, Glyph.malaki_di);
	static skliri_pa = new Fthora('skliri-pa', Genos.chromatiko_skliro, Fthongos.pa, Glyph.skliri_pa);
	static skliri_di = new Fthora('skliri-di', Genos.chromatiko_skliro, Fthongos.di, Glyph.skliri_di);

	/**
	 * @param {string} name
	 * @param {Genos} genos
	 * @param {Fthongos} fthongos
	 * @param {Glyph} glyph
	 */
	constructor(name, genos, fthongos, glyph) {
		super(name, Character.type_fthora, glyph);
		this.#genos = genos;
		this.#fthongos = fthongos;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
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
			horizontal_offset += 0.4;
		}
		return super.get_posotita_main_img(block, target, horizontal_offset, vertical_offset);
	}

	/**
	 * 
	 * @param {Fthongos} fthongos
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLImageElement}
	 */
	get_martyria_main_img(fthongos, horizontal_offset, vertical_offset) {
		horizontal_offset += 0.7;
		return super.get_martyria_main_img(fthongos, horizontal_offset, vertical_offset);
	}

	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		const steps = music_context.klimaka.get_steps(music_context.melos_pitch);
		const base_pitch = music_context.melos_pitch - (this.#fthongos.pitch - this.#genos.base_fthongos.pitch);
		const base_steps = steps - this.#genos.get_steps_from_base(this.#fthongos.pitch - this.#genos.base_fthongos.pitch);
		music_context.klimaka = new Klimaka(this.#genos, base_pitch, base_steps);
	}
}
