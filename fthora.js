import { Glyph } from './glyph.js';
import { SecondaryCharacter } from './secondary.js';
import { Genos } from './genos.js';
import { Fthongos } from './fthongos.js';
import { Klimaka } from './klimaka.js';

/**
 * @import {MusicContext} from './common.js'
 */


export class Fthora extends SecondaryCharacter {

	/**
	 * @type {Genos}
	 */
	#genos;

	/**
	 * @type {Fthongos}
	 */
	#fthongos;

	static diatoniki_ni = new Fthora('diatoniki-ni', Genos.diatoniko, Fthongos.ni, new Glyph(Glyph.font_fthores, 'd'));
	static diatoniki_vou = new Fthora('diatoniki-vou', Genos.diatoniko, Fthongos.vou, new Glyph(Glyph.font_fthores, 'g'));
	static diatoniki_pa = new Fthora('diatoniki-pa', Genos.diatoniko, Fthongos.pa, new Glyph(Glyph.font_fthores, 'f'));
	static diatoniki_ga = new Fthora('diatoniki-ga', Genos.diatoniko, Fthongos.ga, new Glyph(Glyph.font_fthores, 'h'));
	static diatoniki_di = new Fthora('diatoniki-di', Genos.diatoniko, Fthongos.di, new Glyph(Glyph.font_fthores, 'j'));
	static diatoniki_ke = new Fthora('diatoniki-ke', Genos.diatoniko, Fthongos.ke, new Glyph(Glyph.font_fthores, 'k'));
	static chromatiki_malaki_di = new Fthora('chromatiki-malaki-di', Genos.chromatiko_malako, Fthongos.di, new Glyph(Glyph.font_fthores, '2'));
	static chromatiki_skliri_pa = new Fthora('chromatiki-skliri-pa', Genos.chromatiko_skliro, Fthongos.pa, new Glyph(Glyph.font_fthores, '1'));
	static chromatiki_skliri_di = new Fthora('chromatiki-skliri-di', Genos.chromatiko_skliro, Fthongos.di, new Glyph(Glyph.font_fthores, '4'));

	/**
	 * @param {string} name
	 * @param {Genos} genos
	 * @param {Fthongos} fthongos
	 * @param {Glyph} glyph
	 */
	constructor(name, genos, fthongos, glyph) {
		super(name, SecondaryCharacter.type_fthora, glyph);
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
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_span() {
		const span = this.glyph.get_span();
		span.classList.add(Glyph.color_red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_ichos_span() {
		const span = this.glyph.get_span(); // TODO fix position
		span.classList.add(Glyph.color_red);
		return span;
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
