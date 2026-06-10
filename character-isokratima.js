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

	static melos = new Isokratima('melos', null, new Glyph(Glyph.font_ison, 'a'));

	static di_kato = new Isokratima('di-kato', Fthongos.di_kato, new Glyph(Glyph.font_ison, ';'));
	static ke_kato = new Isokratima('ke-kato', Fthongos.ke_kato, new Glyph(Glyph.font_ison, '\''));
	static zo = new Isokratima('zo', Fthongos.zo, new Glyph(Glyph.font_ison, 's'));
	static ni = new Isokratima('ni', Fthongos.ni, new Glyph(Glyph.font_ison, 'd'));
	static pa = new Isokratima('pa', Fthongos.pa, new Glyph(Glyph.font_ison, 'f'));
	static vou = new Isokratima('vou', Fthongos.vou, new Glyph(Glyph.font_ison, 'g'));
	static ga = new Isokratima('ga', Fthongos.ga, new Glyph(Glyph.font_ison, 'h'));
	static di = new Isokratima('di', Fthongos.di, new Glyph(Glyph.font_ison, 'j'));
	static ke = new Isokratima('ke', Fthongos.ke, new Glyph(Glyph.font_ison, 'k'));
	static zo_ano = new Isokratima('zo-ano', Fthongos.zo_ano, new Glyph(Glyph.font_ison, 'l'));

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
	 * @returns {?HTMLSpanElement}
	 */
	get_posotita_main_span(block, target, horizontal_offset, vertical_offset) {
		const posotita = block.get_posotita();
		if (posotita === Posotita.apostrofos) {
			horizontal_offset += 0.5;
		}
		if (posotita === Posotita.oligon_ypsili_aristera) {
			horizontal_offset += 0.3;
		}
		return super.get_posotita_main_span(block, target, horizontal_offset, vertical_offset);
	}
	
	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		music_context.ison_fthongos = this.#fthongos;
	}
}
