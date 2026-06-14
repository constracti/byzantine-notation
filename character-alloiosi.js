import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 */


export class Alloiosi extends Character {

	/**
	 * @type {number}
	 */
	#steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, Glyph.yfesi_apli);
	static yfesi_monogrammi = new Alloiosi('yfesi-monogrammi', -4, Glyph.yfesi_monogrammi);
	static yfesi_digrammi = new Alloiosi('yfesi-digrammi', -6, Glyph.yfesi_digrammi);
	static yfesi_trigrammi = new Alloiosi('yfesi-trigrammi', -8, Glyph.yfesi_trigrammi);

	static diesi_apli = new Alloiosi('diesi-apli', +2, Glyph.diesi_apli);
	static diesi_monogrammi = new Alloiosi('diesi-monogrammi', +4, Glyph.diesi_monogrammi);
	static diesi_digrammi = new Alloiosi('diesi-digrammi', +6, Glyph.diesi_digrammi);
	static diesi_trigrammi = new Alloiosi('diesi-trigrammi', +8, Glyph.diesi_trigrammi);

	/**
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
	 * @param {PosotitaBlock} block
	 * @param {number} target
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLImageElement}
	 */
	get_posotita_main_img(block, target, horizontal_offset, vertical_offset) {
		const posotita = block.get_posotita();
		if (this.#steps > 0) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.4;
			}
		} else {
			horizontal_offset += 0.4;
			if (posotita === Posotita.apostrofos) {
				vertical_offset -= 0.1;
			}
		}
		return super.get_posotita_main_img(block, target, horizontal_offset, vertical_offset);
	}
}
