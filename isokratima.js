import { Glyph } from './glyph.js';
import { Fthongos } from './fthongos.js';
import { SecondaryCharacter } from './secondary.js';


export class Isokratima extends SecondaryCharacter {

	/**
	 * @type {?Fthongos}
	 */
	fthongos;

	/**
	 * @type {Glyph}
	 */
	#glyph_normal;

	/**
	 * @type {Glyph}
	 */
	#glyph_narrow;

	static melos = new Isokratima('melos', null, new Glyph(Glyph.font_ison, 'a'), new Glyph(Glyph.font_ison, 'A'));

	static di_kato = new Isokratima('di-kato', Fthongos.di_kato, new Glyph(Glyph.font_ison, ';'), new Glyph(Glyph.font_ison, ':'));
	static ke_kato = new Isokratima('ke-kato', Fthongos.ke_kato, new Glyph(Glyph.font_ison, '\''), new Glyph(Glyph.font_ison, '"'));
	static zo = new Isokratima('zo', Fthongos.zo, new Glyph(Glyph.font_ison, 's'), new Glyph(Glyph.font_ison, 'S'));
	static ni = new Isokratima('ni', Fthongos.ni, new Glyph(Glyph.font_ison, 'd'), new Glyph(Glyph.font_ison, 'D'));
	static pa = new Isokratima('pa', Fthongos.pa, new Glyph(Glyph.font_ison, 'f'), new Glyph(Glyph.font_ison, 'F'));
	static vou = new Isokratima('vou', Fthongos.vou, new Glyph(Glyph.font_ison, 'g'), new Glyph(Glyph.font_ison, 'G'));
	static ga = new Isokratima('ga', Fthongos.ga, new Glyph(Glyph.font_ison, 'h'), new Glyph(Glyph.font_ison, 'H'));
	static di = new Isokratima('di', Fthongos.di, new Glyph(Glyph.font_ison, 'j'), new Glyph(Glyph.font_ison, 'J'));
	static ke = new Isokratima('ke', Fthongos.ke, new Glyph(Glyph.font_ison, 'k'), new Glyph(Glyph.font_ison, 'K'));

	/**
	 * @param {string} name
	 * @param {?Fthongos} fthongos
	 * @param {Glyph} glyph_normal
	 * @param {Glyph} glyph_narrow
	 */
	constructor(name, fthongos, glyph_normal, glyph_narrow) {
		super(name, SecondaryCharacter.type_isokratima, glyph_normal, glyph_narrow);
		this.fthongos = fthongos;
		this.#glyph_normal = glyph_normal;
		this.#glyph_narrow = glyph_narrow;
	}
}
