import { Glyph } from './glyph.js';
import { SecondaryCharacter } from './secondary.js';
import { Genos } from './genos.js';
import { Fthongos } from './fthongos.js';
import { Klimaka } from './klimaka.js';

/**
 * @typedef {import('./common.js').MusicContext} MusicContext
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

	static diatoniki_ni = new Fthora('diatoniki-ni', Genos.diatoniko, Fthongos.ni, new Glyph(Glyph.font_fthores, 'd'), new Glyph(Glyph.font_fthores, 'D'));
	static diatoniki_pa = new Fthora('diatoniki-pa', Genos.diatoniko, Fthongos.pa, new Glyph(Glyph.font_fthores, 'f'), new Glyph(Glyph.font_fthores, 'F'));
	static diatoniki_di = new Fthora('diatoniki-di', Genos.diatoniko, Fthongos.di, new Glyph(Glyph.font_fthores, 'j'), new Glyph(Glyph.font_fthores, 'J'));
	static chromatiki_malaki_di = new Fthora('chromatiki-malaki-di', Genos.chromatiko_malako, Fthongos.di, new Glyph(Glyph.font_fthores, '2'), new Glyph(Glyph.font_fthores, '@'));
	static chromatiki_skliri_pa = new Fthora('chromatiki-skliri-pa', Genos.chromatiko_skliro, Fthongos.pa, new Glyph(Glyph.font_fthores, '1'), new Glyph(Glyph.font_fthores, '!'));
	static chromatiki_skliri_di = new Fthora('chromatiki-skliri-di', Genos.chromatiko_skliro, Fthongos.di, new Glyph(Glyph.font_fthores, '4'), new Glyph(Glyph.font_fthores, '$'));

	/**
	 * @param {string} name
	 * @param {Genos} genos
	 * @param {Fthongos} fthongos
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, genos, fthongos, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_fthora, glyph, glyph_thin);
		this.#genos = genos;
		this.#fthongos = fthongos;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
	}

	/**
	 * @param {MusicContext} music_context
	 */
	apply(music_context) {
		const steps = music_context.klimaka.get_steps(music_context.pitch);
		const base_pitch = music_context.pitch - (this.#fthongos.pitch - this.#genos.base_fthongos.pitch);
		const base_steps = steps - this.#genos.get_steps_from_base(this.#fthongos.pitch - this.#genos.base_fthongos.pitch);
		music_context.klimaka = new Klimaka(this.#genos, base_pitch, base_steps);
	}
}
