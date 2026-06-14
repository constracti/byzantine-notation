import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 */


export class Chronos extends Character {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, Glyph.klasma);
	static apli = new Chronos('apli', 1, Glyph.apli);
	static dipli = new Chronos('dipli', 2, Glyph.dipli);
	static tripli = new Chronos('tripli', 3, Glyph.tripli);

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Glyph} glyph
	 */
	constructor(name, beats, glyph) {
		super(name, Character.type_chronos, glyph);
		this.beats = beats;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.syneches_elafron)
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
		if (this === Chronos.klasma) {
			if (posotita.is_petasti()) {
				vertical_offset += 0.8;
				horizontal_offset -= 0.05;
			}
			if (posotita === Posotita.oligon_ypsili_dexia) {
				horizontal_offset -= 0.2;
			}
			if (posotita === Posotita.oligon_ypsili_aristera) {
				horizontal_offset += 0.1;
			}
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.5;
			}
			if (posotita === Posotita.oligon_apostrofos) {
				vertical_offset += 0.8;
			}
		}
		if (this === Chronos.apli) {
			if (posotita === Posotita.apostrofos) {
				horizontal_offset += 0.5;
			}
			if (posotita === Posotita.kentimata_oligon) {
				vertical_offset += 0.25;
			}
		}
		return super.get_posotita_main_img(block, target, horizontal_offset, vertical_offset);
	}
}
