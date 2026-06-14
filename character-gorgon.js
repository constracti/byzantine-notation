import { Glyph } from './glyph.js';
import { Posotita } from './posotita.js';
import { Character } from './character.js';

/**
 * @import {PosotitaBlock} from './block-posotita.js'
 */


export class Gorgon extends Character {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], Glyph.gorgon);
	static gorgon_prin = new Gorgon('gorgon-prin', [2/3, 1/3], Glyph.gorgon_prin);
	static gorgon_meta = new Gorgon('gorgon-meta', [1/3, 2/3], Glyph.gorgon_meta);
	static digorgon = new Gorgon('digorgon', [1/3, 1/3, 1/3], Glyph.digorgon);
	static digorgon_prin = new Gorgon('digorgon-prin', [2/4, 1/4, 1/4], Glyph.digorgon_prin);
	static digorgon_mesi = new Gorgon('digorgon-mesi', [1/4, 2/4, 1/4], Glyph.digorgon_mesi);
	static digorgon_meta = new Gorgon('digorgon-meta', [1/4, 1/4, 2/4], Glyph.digorgon_meta);
	static trigorgon = new Gorgon('trigorgon', [1/4, 1/4, 1/4, 1/4], Glyph.trigorgon);

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Glyph} glyph
	 */
	constructor(name, tuple, glyph) {
		super(name, Character.type_gorgon, glyph);
		this.tuple = tuple;
	}

	/**
	 * @param {Posotita} posotita
	 * @returns {number}
	 */
	get_default_target(posotita) {
		if (posotita === Posotita.apostrofos_kentimata)
			return 1;
		if (posotita === Posotita.apostrofos_yporroi)
			return 1;
		if (posotita === Posotita.elafron_kentimata)
			return 1;
		if (posotita === Posotita.ison_kentimata)
			return 1;
		if (posotita === Posotita.kentimata_oligon)
			return 0;
		if (posotita === Posotita.oligon_kentimata)
			return 1;
		return super.get_default_target(posotita);
	}

	static #simple_posotita_set = new Set([
		Posotita.ison,
		Posotita.oligon,
		Posotita.oligon_kentima_dipla,
		Posotita.kentimata,
		Posotita.apostrofos,
	]);

	/**
	 * @param {PosotitaBlock} block
	 * @param {number} target
	 * @param {number} horizontal_offset
	 * @param {number} vertical_offset
	 * @returns {?HTMLImageElement}
	 */
	get_posotita_main_img(block, target, horizontal_offset, vertical_offset) {
		const posotita = block.get_posotita();
		// place gorgon below posotita
		const previous_block = block.get_previous_block();
		const move_gorgon_down = this.tuple.length === 2 && Gorgon.#simple_posotita_set.has(posotita) && !block.has_kallopismos() && (
			previous_block === null
			||
			!(
				previous_block.keep_gorgon_over_simple()
				||
				(posotita === Posotita.apostrofos && previous_block.keep_gorgon_over_apostrofos())
			)
		);
		if (move_gorgon_down) {
			vertical_offset += 0.9;
		}
		if (posotita === Posotita.apostrofos) {
			horizontal_offset += 0.4;
			if (move_gorgon_down)
				vertical_offset += 0.1;
		}
		if (posotita === Posotita.kentimata) {
			horizontal_offset += 0.3;
			if (move_gorgon_down)
				horizontal_offset += 0.2;
		}
		if (posotita === Posotita.apostrofos_kentimata || posotita === Posotita.elafron_kentimata || posotita === Posotita.ison_kentimata) {
			horizontal_offset += 0.2;
			vertical_offset -= 0.2;
		}
		if (posotita === Posotita.oligon_kentimata) {
			vertical_offset -= 0.25;
		}
		if (posotita === Posotita.yporroi || posotita === Posotita.apostrofos_yporroi) {
			horizontal_offset += 0.8;
		}
		return super.get_posotita_main_img(block, target, horizontal_offset, vertical_offset);
	}
}
