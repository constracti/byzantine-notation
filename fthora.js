import { Glyph } from './glyph.js';
import { PosotitaBlock } from './block-posotita.js';
import { SecondaryCharacter } from './secondary.js';
import { Klimaka } from './klimaka.js';
import { Fthongos } from './fthongos.js';


export class Fthora extends SecondaryCharacter {

	/**
	 * @type {Klimaka}
	 */
	#genos;

	/**
	 * @type {Fthongos}
	 */
	#fthongos;

	static diatoniki_di = new Fthora('diatoniki-di', Klimaka.diatoniki, Fthongos.di, new Glyph(Glyph.font_fthores, 'j'), new Glyph(Glyph.font_fthores, 'J'));
	static chromatiki_skliri_di = new Fthora('chromatiki-skliri-di', Klimaka.chromatiki_skliri, Fthongos.di, new Glyph(Glyph.font_fthores, '4'), new Glyph(Glyph.font_fthores, '$'));

	/**
	 * @param {string} name
	 * @param {Klimaka} genos
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
		const note_steps = music_context.base_steps + music_context.scale.get_steps_from_base(music_context.pitch - music_context.base_pitch);
		music_context.base_pitch = music_context.pitch - (this.#fthongos.index - this.#genos.base_pitch);
		music_context.base_steps = note_steps - this.#genos.get_steps_from_base(this.#fthongos.index - this.#genos.base_pitch);
		music_context.scale = this.#genos;
	}
}
