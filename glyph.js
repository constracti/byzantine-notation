export class Glyph {

	/**
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

	static empty = new Glyph('', '');

	static color_red = 'bz-red';

	static font_byzantina = 'bz-byzantina';
	static font_loipa = 'bz-loipa'; // TODO top margin
	static font_fthores = 'bz-fthores';
	static font_ison = 'bz-ison'; // TODO margin
	static font_chronos = 'bz-chronos';

	/**
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(font, char) {
		this.font = font;
		this.char = char;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = document.createElement('span');
		if (this.font !== '')
			span.classList.add(this.font);
		span.innerHTML = this.char;
		return span;
	}
}
