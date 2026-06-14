import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 * @import {Fthongos} from './fthongos.js'
 * @import {Vathmida} from './vathmida.js'
 */


export class Character {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {?string}
	 */
	type;

	/**
	 * @type {Glyph}
	 */
	glyph;

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_alloiosi = 'alloiosi';
	static type_fthora = 'fthora';
	static type_chroa = 'chroa';
	static type_isokratima = 'ison';
	static type_rythmos = 'rythmos';
	static type_simadi = 'simadi';
	static type_agogi = 'agogi';

	static vareia = new Character('vareia', null, Glyph.vareia);
	static psifiston = new Character('psifiston', null, Glyph.psifiston);
	static antikenoma = new Character('antikenoma', null, Glyph.antikenoma);
	static omalon_mono = new Character('omalon-mono', null, Glyph.omalon_mono);
	static omalon_diplo = new Character('omalon-diplo', null, Glyph.omalon_diplo);
	static syndesmos = new Character('omalon-mono', null, Glyph.syndesmos);
	static diastoli = new Character('diastoli', null, Glyph.diastoli);
	static rythmos_trisimos = new Character('rythmos-trisimos', Character.type_rythmos, Glyph.rythmos_trisimos);
	static rythmos_tetrasimos = new Character('rythmos-tetrasimos', Character.type_rythmos, Glyph.rythmos_tetrasimos);
	static stavros = new Character('stavros', null, Glyph.stavros);

	/**
	 * @param {string} name
	 * @param {?string} type
	 * @param {Glyph} glyph
	 */
	constructor(name, type, glyph) {
		this.name = name;
		this.type = type;
		this.glyph = glyph;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.kentimata_oligon)
			return 1;
		return 0;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		if (this.type === Character.type_rythmos)
			return Glyph.color_red;
		if (this === Character.stavros)
			return Glyph.color_red;
		return null;
	}

	/**
	 * @returns {?HTMLImageElement}
	 */
	get_posotita_prev_img() {
		if (this === Character.vareia)
			return this.glyph.get_img();
		return null;
	}

	/**
	 * @returns {number}
	 */
	get_posotita_prev_margin() {
		if (this === Character.vareia)
			return 0.8;
		return 0;
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
		if (this === Character.vareia)
			return null;
		if (this === Character.antikenoma) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
			if (posotita === Posotita.kentimata_oligon) {
				vertical_offset += 0.25;
			}
			if (posotita === Posotita.oligon_kentima_kato) {
				vertical_offset += 0.25;
			}
		}
		if (this === Character.omalon_mono) {
			horizontal_offset -= 0.2;
		}
		if (this.type === Character.type_rythmos) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
			if (posotita === Posotita.petasti_oligon) {
				vertical_offset -= 0.2;
			}
		}
		return Character.get_main_img(this.glyph, this.get_color(), horizontal_offset, vertical_offset);
	}

	/**
	 * 
	 * @param {Fthongos} fthongos
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLImageElement}
	 */
	get_martyria_main_img(fthongos, horizontal_offset, vertical_offset) {
		return Character.get_main_img(this.glyph, this.get_color(), horizontal_offset + 0.02, vertical_offset);
	}

	/**
	 * @param {Vathmida} vathmida
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLImageElement}
	 */
	get_ichos_main_img(vathmida, horizontal_offset, vertical_offset) {
		return Character.get_main_img(this.glyph, this.get_color(), horizontal_offset + 0.5, vertical_offset - 0.6);
	}

	/**
	 * @param {Glyph} glyph
	 * @param {?string} color
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLImageElement}
	 */
	static get_main_img(glyph, color, horizontal_offset, vertical_offset) {
		const img = glyph.get_img();
		if (color !== null)
			img.classList.add(color);
		img.style.position = 'absolute';
		img.style.right = `${-horizontal_offset.toFixed(2)}em`;
		img.style.top = `${vertical_offset.toFixed(2)}em`;
		return img;
	}
}
