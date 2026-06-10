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

	static vareia = new Character('vareia', null, new Glyph(Glyph.font_byzantina, '\\'));
	static psifiston = new Character('psifiston', null, new Glyph(Glyph.font_byzantina, '/'));
	static antikenoma = new Character('antikenoma', null, new Glyph(Glyph.font_byzantina, 'm'));
	static omalon_mono = new Character('omalon-mono', null, new Glyph(Glyph.font_byzantina, '<'));
	static omalon_diplo = new Character('omalon-diplo', null, new Glyph(Glyph.font_byzantina, ','));
	static syndesmos = new Character('omalon-mono', null, new Glyph(Glyph.font_loipa, '}'));
	static diastoli = new Character('diastoli', null, new Glyph(Glyph.font_byzantina, 'o'));
	static rythmos_trisimos = new Character('rythmos-trisimos', Character.type_rythmos, new Glyph(Glyph.font_fthores, '6'));
	static rythmos_tetrasimos = new Character('rythmos-tetrasimos', Character.type_rythmos, new Glyph(Glyph.font_fthores, '7'));
	static stavros = new Character('stavros', null, new Glyph(Glyph.font_fthores, '\''));

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
	 * @returns {?HTMLSpanElement}
	 */
	get_posotita_prev_span() {
		if (this === Character.vareia)
			return this.glyph.get_span();
		return null;
	}

	/**
	 * @returns {number}
	 */
	get_posotita_prev_margin() {
		if (this === Character.vareia)
			return 0.5;
		return 0;
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
		if (this === Character.vareia)
			return null;
		if (this === Character.antikenoma) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
			if (posotita === Posotita.kentimata_oligon) {
				vertical_offset += 0.2;
			}
			if (posotita === Posotita.oligon_kentima_kato) {
				vertical_offset += 0.2;
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
		return Character.get_main_span(this.glyph, this.get_color(), horizontal_offset, vertical_offset);
	}

	/**
	 * 
	 * @param {Fthongos} fthongos
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLSpanElement}
	 */
	get_martyria_main_span(fthongos, horizontal_offset, vertical_offset) {
		return Character.get_main_span(this.glyph, this.get_color(), horizontal_offset + 0.02, vertical_offset);
	}

	/**
	 * @param {Vathmida} vathmida
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLSpanElement}
	 */
	get_ichos_main_span(vathmida, horizontal_offset, vertical_offset) {
		return Character.get_main_span(this.glyph, this.get_color(), horizontal_offset + 0.4, vertical_offset - 0.3);
	}

	/**
	 * @param {Glyph} glyph
	 * @param {?string} color
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {HTMLSpanElement}
	 */
	static get_main_span(glyph, color, horizontal_offset, vertical_offset) {
		const span = glyph.get_span();
		if (color !== null)
			span.classList.add(color);
		span.style.position = 'absolute';
		span.style.width = '0.1em';
		horizontal_offset += 0.1;
		vertical_offset -= 0.2;
		span.style.right = `${-horizontal_offset.toFixed(2)}em`;
		span.style.bottom = `${-vertical_offset.toFixed(2)}em`;
		return span;
	}
}
