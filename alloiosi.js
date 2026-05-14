import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';


export class Alloiosi extends Character {

	/**
	 * @type {number}
	 */
	#steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 't'));
	static yfesi_monogrammi = new Alloiosi('yfesi-monogrammi', -4, new Glyph(Glyph.font_byzantina, 'T'));
	static yfesi_digrammi = new Alloiosi('yfesi-digrammi', -6, new Glyph(Glyph.font_fthores, 't'));
	static yfesi_trigrammi = new Alloiosi('yfesi-trigrammi', -8, new Glyph(Glyph.font_fthores, 'T'));

	static diesi_apli = new Alloiosi('diesi-apli', +2, new Glyph(Glyph.font_fthores, 'b'));
	static diesi_monogrammi = new Alloiosi('diesi-monogrammi', +4, new Glyph(Glyph.font_byzantina, 'b'));
	static diesi_digrammi = new Alloiosi('diesi-digrammi', +6, new Glyph(Glyph.font_byzantina, 'B'));
	static diesi_trigrammi = new Alloiosi('diesi-trigrammi', +8, new Glyph(Glyph.font_fthores, 'B'));

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Glyph} glyph
	 */
	constructor(name, steps, glyph) {
		super(name, Character.type_alloiosi, glyph);
		this.#steps = steps;
	}

	/**
	 * @returns {number}
	 */
	get_steps() {
		return this.#steps;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.oligon_kentimata)
			return 1;
		return super.get_default_target(posotita);
	}

	/**
	 * @param {Posotita} posotita
	 * @param {number} target
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLSpanElement}
	 */
	get_posotita_main_span(posotita, target, horizontal_offset, vertical_offset) {
		if (posotita === Posotita.apostrofos) {
			horizontal_offset += 0.3;
		}
		if (posotita === Posotita.oligon_kentimata) {
			horizontal_offset += 0.3;
			vertical_offset -= 0.2;
		}
		return super.get_posotita_main_span(posotita, target, horizontal_offset, vertical_offset);
	}
}
