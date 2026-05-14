import { Glyph } from './glyph.js';
import { Character } from './character.js';


export class MartyrikoSimadi extends Character {

	/**
	 * @type {boolean}
	 */
	teleies;

	static alfa = new MartyrikoSimadi('alfa', new Glyph(Glyph.font_byzantina, '!'), false);
	static alfa_teleies = new MartyrikoSimadi('alfa-teleies', new Glyph(Glyph.font_byzantina, '!'), true);
	static lambda = new MartyrikoSimadi('lambda', new Glyph(Glyph.font_byzantina, '@'), false);
	static nana = new MartyrikoSimadi('nana', new Glyph(Glyph.font_byzantina, '#'), false);
	static varys = new MartyrikoSimadi('varys', new Glyph(Glyph.font_byzantina, '^'), false);
	static delta = new MartyrikoSimadi('delta', new Glyph(Glyph.font_byzantina, '&'), false);
	static delta_teleies = new MartyrikoSimadi('delta-teleies', new Glyph(Glyph.font_byzantina, '&'), true);
	static skliro = new MartyrikoSimadi('skliro', new Glyph(Glyph.font_byzantina, '$'), false);
	static defteros = new MartyrikoSimadi('defteros', new Glyph(Glyph.font_byzantina, '%'), false);
	static defteros_teleies = new MartyrikoSimadi('defteros-teleies', new Glyph(Glyph.font_byzantina, '%'), true);
	static zygos = new MartyrikoSimadi('zygos', new Glyph(Glyph.font_fthores, 'I'), false); // TODO fix both glyphs

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 * @param {boolean} teleies
	 */
	constructor(name, glyph, teleies) {
		super(name, Character.type_simadi, glyph) // TODO martyriko simadi names
		this.teleies = teleies;
	}

	/**
	 * @returns {?string}
	 */
	get_color() {
		return Glyph.color_red;
	}
}
