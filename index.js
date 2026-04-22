const color_object = {
	red: 'bz-red',
};


class Glyph {

	/**
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

	static empty = new Glyph('bz-empty', '');

	static font_byzantina = 'bz-byzantina';
	static font_loipa = 'bz-loipa'; // TODO top margin
	static font_fthores = 'bz-fthores';
	static font_ison = 'bz-ison';
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
		span.classList.add(this.font);
		span.innerHTML = this.char;
		return span;
	}
}


class AbstractBlock {

	/**
	 * @type {?string}
	 */
	type;

	/**
	 * @param {?string} type
	 */
	constructor(type) {
		this.type = type;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = document.createElement('div');
		block_div.classList.add('bz-block');
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		return null;
	}

	/**
	 * @returns {[{index: number, beats: number}]}
	 */
	get_times() {
		return [];
	}
}


class SimpleBlock extends AbstractBlock {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {Glyph}
	 */
	glyph;

	/**
	 * @type {?string}
	 */
	color;

	static vareia = new SimpleBlock('vareia', new Glyph(Glyph.font_byzantina, '\\'), null);
	static diastoli = new SimpleBlock('diastoli', new Glyph(Glyph.font_byzantina, 'o'), null);
	static stavros = new SimpleBlock('stavros', new Glyph(Glyph.font_fthores, '\''), color_object.red);

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 * @param {?string} color
	 */
	constructor(name, glyph, color) {
		super(null);
		this.name = name;
		this.glyph = glyph;
		this.color = color;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		const span = this.glyph.get_span();
		if (this.color !== null)
			span.classList.add(this.color);
		symbol_div.append(span);
		block_div.append(symbol_div);
		return block_div;
	}
}


class MartyriaBlock extends AbstractBlock {

	/**
	 * @type {MartyriaFthongos}
	 */
	fthongos;

	/**
	 * @type {MartyrikoSimadi}
	 */
	simadi;

	/**
	 * @type {boolean}
	 */
	teleies;

	/**
	 * @param {MartyriaFthongos} fthongos
	 * @param {MartyrikoSimadi} simadi
	 * @param {boolean} teleies
	 */
	constructor(fthongos, simadi, teleies) {
		super('martyria');
		this.fthongos = fthongos;
		this.simadi = simadi;
		this.teleies = teleies;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.fthongos.get_span());
		symbol_div.append(this.simadi.get_span());
		if (this.teleies)
			symbol_div.append(MartyriaBlock.#get_teleies_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	static #get_teleies_span() {
		const glyph = new Glyph(Glyph.font_byzantina, '`');
		const span = glyph.get_span();
		span.classList.add(color_object.red);
		return span;
	}
}


class MartyriaFthongos {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {number} 0 for ni, 1 for pa, ..., 6 for zo
	 */
	note;

	/**
	 * @type {Glyph}
	 */
	glyph;

	static ni = new MartyriaFthongos('ni', 0, new Glyph(Glyph.font_byzantina, '7'));
	static pa = new MartyriaFthongos('pa', 1, new Glyph(Glyph.font_byzantina, '1'));
	static vou = new MartyriaFthongos('vou', 2, new Glyph(Glyph.font_byzantina, '2'));
	static ga = new MartyriaFthongos('ga', 3, new Glyph(Glyph.font_byzantina, '3'));
	static di = new MartyriaFthongos('di', 4, new Glyph(Glyph.font_byzantina, '4'));
	static ke = new MartyriaFthongos('ke', 5, new Glyph(Glyph.font_byzantina, '5'));
	static zo = new MartyriaFthongos('zo', 6, new Glyph(Glyph.font_byzantina, '6'));

	/**
	 * @param {string} name
	 * @param {number} note
	 * @param {Glyph} glyph
	 */
	constructor(name, note, glyph) {
		this.name = name;
		this.note = note;
		this.glyph = glyph;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = this.glyph.get_span();
		span.classList.add(color_object.red);
		return span;
	}
}


class MartyrikoSimadi {

	/**
	 * @type {string}
	 */
	name; // TODO martyriko simadi names

	/**
	 * @type {Glyph}
	 */
	glyph;

	static protos = new MartyrikoSimadi('protos', new Glyph(Glyph.font_byzantina, '!'));
	static nana = new MartyrikoSimadi('nana', new Glyph(Glyph.font_byzantina, '#'));
	static varys = new MartyrikoSimadi('varys', new Glyph(Glyph.font_byzantina, '^'));
	static delta = new MartyrikoSimadi('delta', new Glyph(Glyph.font_byzantina, '&'));

	/**
	 * @param {string} name
	 * @param {Glyph} glyph
	 */
	constructor(name, glyph) {
		this.name = name;
		this.glyph = glyph;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = this.glyph.get_span();
		span.classList.add(color_object.red);
		return span;
	}
}


class PosotitaBlock extends AbstractBlock {

	/**
	 * @type {Posotita}
	 */
	posotita;

	/**
	 * @type {SecondaryCharacter[]}
	 */
	secondary_list;

	/**
	 * @type {?Chronos}
	 */
	chronos = null;

	/**
	 * @type {?Gorgon}
	 */
	gorgon = null;

	/**
	 * @type {?SecondaryCharacter}
	 */
	kallopismos = null;

	/**
	 * @type {?Alloiosi}
	 */
	alloiosi = null;

	/**
	 * @type {?SecondaryCharacter}
	 */
	rythmos = null;

	/**
	 * @type {?string}
	 */
	syllavi;

	/**
	 * @param {Posotita} posotita
	 * @param {SecondaryCharacter[]} secondary_list
	 * @param {?string} syllavi
	 */
	constructor(posotita, secondary_list, syllavi) {
		super('posotita');
		this.posotita = posotita;
		this.secondary_list = secondary_list;
		secondary_list.forEach(secondary => {
			switch (secondary.type) {
				case SecondaryCharacter.type_chronos:
					this.chronos = secondary;
					break;
				case SecondaryCharacter.type_gorgon:
					this.gorgon = secondary;
					break;
				case SecondaryCharacter.type_kallopismos:
					this.kallopismos = secondary;
					break;
				case SecondaryCharacter.type_alloiosi:
					this.alloiosi = secondary;
					break;
				case SecondaryCharacter.type_rythmos:
					this.rythmos = secondary;
					break;
			}
		});
		this.syllavi = syllavi;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.posotita.get_span(this));
		this.secondary_list.forEach(secondary => {
			symbol_div.append(secondary.get_span(this));
		});
		block_div.append(symbol_div);
		if (this.syllavi !== null)
			block_div.append(PosotitaBlock.#get_syllavi_span(this.syllavi));
		return block_div;
	}

	/**
	 * @param {string} syllavi
	 * @returns {HTMLSpanElement}
	 */
	static #get_syllavi_span(syllavi) {
		const span = document.createElement('span');
		span.classList.add('bz-text');
		span.textContent = syllavi;
		return span;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		/**
		 * @type {Part[]}
		 */
		const part_list = [];
		this.posotita.move_list.forEach(move => {
			music_context.pitch += move;
			part_list.push({
				pitch: music_context.pitch,
				steps: 0,
				tempo: music_context.tempo,
				beats: 1,
				block: block_index,
			});
		});
		if (this.alloiosi !== null) {
			if (part_list.length >= 1)
				part_list[part_list.length - 1].steps += this.alloiosi.steps;
		}
		return part_list;
	}

	/**
	 * @returns {[{index: number, beats: number}]}
	 */
	get_times() {
		/**
		 * @type {[{index: number, beats: number}]}
		 */
		const time_list = [];
		if (this.posotita === Posotita.syneches_elafron) {
			time_list.push({index: -1, beats: 1/2 - 1});
			time_list.push({index: 0, beats: 1/2 - 1});
		}
		if (this.chronos !== null) {
			time_list.push({index: this.posotita.move_list.length - 1, beats: this.chronos.beats});
		}
		if (this.gorgon !== null) {
			if (this.posotita === Posotita.yporroi) {
				this.gorgon.tuple.forEach((value, index) => {
					time_list.push({index: index - 1, beats: value - 1});
				})
			} else {
				this.gorgon.tuple.forEach((value, index) => {
					time_list.push({index: this.posotita.move_list.length - 1 + index - 1, beats: value - 1});
				})
			}
		}
		return time_list;
	}
}


class Posotita {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {number[]}
	 */
	move_list;

	/**
	 * @type {Glyph}
	 */
	glyph;

	// isotita
	static ison = new Posotita('ison', [0], new Glyph(Glyph.font_byzantina, 'a'));
	static ison_petasti = new Posotita('ison-petasti', [0], new Glyph(Glyph.font_byzantina, 'A'));
	static ison_stirigma = new Posotita('ison-stirigma', [0], new Glyph(Glyph.font_loipa, '0'));
	// anavasi
	static oligon = new Posotita('oligon', [+1], new Glyph(Glyph.font_byzantina, 's'));
	static petasti = new Posotita('petasti', [+1], new Glyph(Glyph.font_byzantina, 'S'));
	static kentimata = new Posotita('kentimata', [+1], new Glyph(Glyph.font_byzantina, 'x'));
	static oligon_kentima_kato = new Posotita('oligon-kentima-kato', [+2], new Glyph(Glyph.font_byzantina, 'd'));
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], new Glyph(Glyph.font_byzantina, 'sC'));
	static oligon_petasti = new Posotita('oligon-petasti', [+2], new Glyph(Glyph.font_byzantina, 'D'));
	static oligon_kentima_petasti = new Posotita('oligon-kentima-petasti', [+3], new Glyph(Glyph.font_byzantina, 'F'));
	static ypsili_dexia = new Posotita('ypsili-dexia', [+4], new Glyph(Glyph.font_byzantina, 'g'));
	static ypsili_aristera = new Posotita('ypsili-aristera', [+5], new Glyph(Glyph.font_loipa, 's'));
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], new Glyph(Glyph.font_byzantina, 'j'));
	static apostrofos_petasti = new Posotita('apostrofos-petasti', [-1], new Glyph(Glyph.font_byzantina, 'J'));
	static elafron = new Posotita('elafron', [-2], new Glyph(Glyph.font_byzantina, 'k'));
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], new Glyph(Glyph.font_byzantina, 'l'));
	static chamili = new Posotita('chamili', [-4], new Glyph(Glyph.font_byzantina, ';'));
	// symploki
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], new Glyph(Glyph.font_byzantina, 'v'));
	static kentimata_oligon = new Posotita('kentimata-oligon', [+1, +1], new Glyph(Glyph.font_byzantina, 'c'));
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], new Glyph(Glyph.font_byzantina, 'h'));
	static yporroi = new Posotita('yporroi', [-1, -1], new Glyph(Glyph.font_byzantina, '\''));
	// TODO center text below syneches elafron
	static ison_kentimata = new Posotita('ison-kentimata', [0, +1], new Glyph(Glyph.font_byzantina, '_'));
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], new Glyph(Glyph.font_byzantina, '-'));

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {Glyph} glyph
	 */
	constructor(name, move_list, glyph) {
		this.name = name;
		this.move_list = move_list;
		this.glyph = glyph;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		return this.get_glyph(block).get_span();
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (this === Posotita.oligon_kentimata && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, 'V'); // oligon kentimata gorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, ':'); // yporroi gorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.digorgon)
			return new Glyph(Glyph.font_loipa, 'e'); // yporroi digorgon
		if (this === Posotita.yporroi && block.gorgon === Gorgon.trigorgon)
			return new Glyph(Glyph.font_loipa, 'r'); // yporroi trigorgon
		return this.glyph;
	}

	/**
	 * @returns {boolean}
	 */
	is_thin() {
		switch (this) {
			case Posotita.kentimata:
			case Posotita.apostrofos:
			case Posotita.yporroi:
				return true;
			default:
				return false;
		}
	}

	/**
	 * @returns {boolean}
	 */
	is_petasti() {
		switch (this) {
			case Posotita.ison_petasti:
			case Posotita.petasti:
			case Posotita.oligon_petasti:
			case Posotita.oligon_kentima_petasti:
			case Posotita.apostrofos_petasti:
				return true;
			default:
				return false;
		}
	}
}


class AgogiBlock extends AbstractBlock {

	/**
	 * @type {Agogi}
	 */
	agogi;

	/**
	 * @param {Agogi} agogi
	 */
	constructor(agogi) {
		super('agogi');
		this.agogi = agogi;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		symbol_div.append(this.agogi.get_primary_span());
		block_div.append(symbol_div);
		return block_div;
	}

	/**
	 * @param {MusicContext} music_context
	 * @param {number} block_index
	 * @returns {?Part[]}
	 */
	get_parts(music_context, block_index) {
		music_context.tempo = this.agogi.tempo;
		return null;
	}
}


class Agogi {

	/**
	 * @type {name}
	 */
	name;

	/**
	 * @type {number}
	 */
	tempo;

	/**
	 * @type {Glyph}
	 */
	primary_glyph;

	/**
	 * @type {Glyph}
	 */
	secondary_glyph;

	static metria = new Agogi('metria', 120, new Glyph(Glyph.font_chronos, 'k'), new Glyph(Glyph.font_chronos, 'K'));
	static tacheia = new Agogi('tacheia', 180, new Glyph(Glyph.font_chronos, 'l'), new Glyph(Glyph.font_chronos, 'L'));

	/**
	 * @param {string} name
	 * @param {number} tempo
	 * @param {Glyph} primary_glyph
	 * @param {Glyph} secondary_glyph
	 */
	constructor(name, tempo, primary_glyph, secondary_glyph) {
		this.name = name;
		this.tempo = tempo;
		this.primary_glyph = primary_glyph;
		this.secondary_glyph = secondary_glyph;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_primary_span() {
		const span = this.primary_glyph.get_span();
		span.classList.add(color_object.red);
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_secondary_span() {
		const span = this.secondary_glyph.get_span();
		span.classList.add(color_object.red);
		return span;
	}
}


class SecondaryCharacter {

	/**
	 * @type {string}
	 */
	name;

	/**
	 * @type {string}
	 */
	type;

	/**
	 * @type {Glyph}
	 */
	glyph;

	/**
	 * @type {?Glyph}
	 */
	glyph_thin;

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_kallopismos = 'kallopismos';
	static type_rythmos = 'rythmos';
	static type_alloiosi = 'alloiosi';

	static psifiston = new SecondaryCharacter('psifiston', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '/'), null);
	static antikenoma = new SecondaryCharacter('antikenoma', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, 'm'), new Glyph(Glyph.font_byzantina, 'M'));
	static omalon_mono = new SecondaryCharacter('omalon-mono', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, '<'), null);
	static omalon_diplo = new SecondaryCharacter('omalon-diplo', SecondaryCharacter.type_kallopismos, new Glyph(Glyph.font_byzantina, ','), null);
	static rythmos_trisimos = new SecondaryCharacter('rythmos-trisimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '6'), new Glyph(Glyph.font_fthores, '^'));
	static rythmos_tetrasimos = new SecondaryCharacter('rythmos-tetrasimos', SecondaryCharacter.type_rythmos, new Glyph(Glyph.font_fthores, '7'), new Glyph(Glyph.font_fthores, '&'));

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, type, glyph, glyph_thin) {
		this.name = name;
		this.type = type;
		this.glyph = glyph;
		this.glyph_thin = glyph_thin;
	}

	is_red() {
		return this.type === SecondaryCharacter.type_rythmos;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		const span = this.get_glyph(block).get_span();
		if (this.is_red())
			span.classList.add(color_object.red);
		return span;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita.is_thin() && this.glyph_thin !== null)
			return this.glyph_thin;
		return this.glyph;
	}
}


class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, new Glyph(Glyph.font_byzantina, 'u'), new Glyph(Glyph.font_byzantina, 'i'));
	static apli = new Chronos('apli', 1, new Glyph(Glyph.font_byzantina, '8'), new Glyph(Glyph.font_byzantina, '*'));
	static dipli = new Chronos('dipli', 2, new Glyph(Glyph.font_byzantina, '9'), new Glyph(Glyph.font_byzantina, '('));

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, beats, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_chronos, glyph, glyph_thin);
		this.beats = beats;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita.is_petasti() && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I'); // petasti kato
		if (block.posotita === Posotita.ypsili_dexia && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'U'); // klasma aristera
		return super.get_glyph(block);
	}
}


class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'e'), new Glyph(Glyph.font_byzantina, 'r'));
	static gorgon_kato = new Gorgon('gorgon-kato', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'E'), new Glyph(Glyph.font_byzantina, 'R'));
	static digorgon = new Gorgon('digorgon', [1/3, 1/3, 1/3], new Glyph(Glyph.font_loipa, '2'), new Glyph(Glyph.font_loipa, '@'));
	static trigorgon = new Gorgon('digorgon', [1/4, 1/4, 1/4, 1/4], new Glyph(Glyph.font_loipa, '6'), new Glyph(Glyph.font_loipa, '^'));

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, tuple, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_gorgon, glyph, glyph_thin);
		this.tuple = tuple;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita === Posotita.oligon_kentimata && this === Gorgon.gorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.gorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.digorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.yporroi && this === Gorgon.trigorgon)
			return Glyph.empty;
		if (block.posotita === Posotita.ison_kentimata)
			return this.glyph_thin ?? this.glyph;
		if (block.posotita === Posotita.apostrofos_kentimata)
			return this.glyph_thin ?? this.glyph;
		// TODO gorgon kato on kentimata
		return super.get_glyph(block);
	}
}


class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 't'), new Glyph(Glyph.font_byzantina, 'y'));
	static yfesi_monogrammi = new Alloiosi('yfesi_monogrammi', -4, new Glyph(Glyph.font_byzantina, 'T'), new Glyph(Glyph.font_byzantina, 'Y'));

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Glyph} glyph
	 * @param {?Glyph} glyph_thin
	 */
	constructor(name, steps, glyph, glyph_thin) {
		super(name, SecondaryCharacter.type_alloiosi, glyph, glyph_thin);
		this.steps = steps;
	}

	/**
	 * @returns {boolean}
	 */
	is_red() {
		return true;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {Glyph}
	 */
	get_glyph(block) {
		if (block.posotita === Posotita.oligon_kentimata)
			return this.glyph_thin ?? this.glyph;
		return super.get_glyph(block);
	}
}


const block_list = [
	// Εκ νεότητός μου
	new PosotitaBlock(Posotita.ison, [], 'Εκ'),
	new PosotitaBlock(Posotita.ison, [], 'νε'),
	new PosotitaBlock(Posotita.oligon_kentima_dipla, [], 'ο'),
	new PosotitaBlock(Posotita.oligon, [], 'τη'),
	new PosotitaBlock(Posotita.oligon, [], 'τος'),
	new PosotitaBlock(Posotita.ison, [], 'μου'),
	new PosotitaBlock(Posotita.ison, [], 'ο'),
	new PosotitaBlock(Posotita.ison, [], 'εχ'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [], 'θρο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ος'),
	new PosotitaBlock(Posotita.oligon, [], 'με'),
	new PosotitaBlock(Posotita.oligon, [], 'πει'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Alloiosi.yfesi_monogrammi], 'ρα'),
	new PosotitaBlock(Posotita.elafron, [], 'ζει'),
	new PosotitaBlock(Posotita.ison, [], 'ταις'),
	new PosotitaBlock(Posotita.ison, [], 'η'),
	new PosotitaBlock(Posotita.apostrofos, [], 'δο'),
	new PosotitaBlock(Posotita.oligon_kentimata, [SecondaryCharacter.psifiston, Alloiosi.yfesi_apli], 'ναις'),
	new PosotitaBlock(Posotita.apostrofos, [], 'φλε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'γει'),
	new PosotitaBlock(Posotita.apostrofos, [], 'με'),
	new PosotitaBlock(Posotita.ison, [], 'ε'),
	new PosotitaBlock(Posotita.ison_petasti, [], 'γω'),
	new PosotitaBlock(Posotita.apostrofos, [], 'δε'),
	new PosotitaBlock(Posotita.oligon, [], 'πε'),
	new PosotitaBlock(Posotita.oligon, [], 'ποι'),
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], 'θως'),
	new PosotitaBlock(Posotita.ison, [], 'εν'),
	new PosotitaBlock(Posotita.oligon, [], 'σοι'),
	new PosotitaBlock(Posotita.apostrofos_petasti, [], 'Κυ'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ρι'),
	new PosotitaBlock(Posotita.syneches_elafron, [], 'ε'),
	new PosotitaBlock(Posotita.oligon, [], 'τρο'),
	new PosotitaBlock(Posotita.oligon, [SecondaryCharacter.psifiston], 'που'),
	new PosotitaBlock(Posotita.apostrofos, [], 'μαι'),
	new PosotitaBlock(Posotita.apostrofos_kentimata, [], 'του'),
	new PosotitaBlock(Posotita.elafron, [Chronos.klasma], 'τον'),
	new MartyriaBlock(MartyriaFthongos.ni, MartyrikoSimadi.delta, false),
	// Οι μισούντες Σιών
	new PosotitaBlock(Posotita.oligon_kentima_dipla, [], 'Οι'),
	new PosotitaBlock(Posotita.oligon, [], 'μι'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.petasti, [SecondaryCharacter.rythmos_trisimos], 'σου'),
	new PosotitaBlock(Posotita.elafron, [], 'ντες'),
	new PosotitaBlock(Posotita.oligon, [], 'Σι'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], 'ων'),
	new PosotitaBlock(Posotita.ison, [], 'γε'),
	new PosotitaBlock(Posotita.ison, [], 'νη'),
	new PosotitaBlock(Posotita.ison, [], 'θη'),
	new PosotitaBlock(Posotita.kentimata, [], 'η'),
	new PosotitaBlock(Posotita.ison, [], 'τω'),
	new PosotitaBlock(Posotita.elafron, [], 'σαν'),
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], 'δη'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison, [SecondaryCharacter.rythmos_trisimos], 'πριν'),
	new PosotitaBlock(Posotita.ison, [], 'εκ'),
	new PosotitaBlock(Posotita.ison, [], 'σπα'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.elafron_apostrofos, [], 'σθη'),
	new PosotitaBlock(Posotita.kentimata, [], 'η'),
	new PosotitaBlock(Posotita.ison, [], 'ναι'),
	new PosotitaBlock(Posotita.elafron, [], 'ως'),
	new PosotitaBlock(Posotita.oligon_kentimata, [], 'χορ'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.elafron, [Chronos.klasma, SecondaryCharacter.rythmos_trisimos], 'τος'),
	new PosotitaBlock(Posotita.oligon, [], 'συγ'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.petasti, [], 'κο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ψει'),
	new PosotitaBlock(Posotita.oligon, [], 'γαρ'),
	new PosotitaBlock(Posotita.oligon, [], 'Χρι'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma, SecondaryCharacter.rythmos_trisimos], 'στος'),
	SimpleBlock.stavros,
	new PosotitaBlock(Posotita.ison, [], 'αυ'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon, Alloiosi.yfesi_monogrammi], 'χε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'νας'),
	new PosotitaBlock(Posotita.ison, [], 'αυ'),
	new PosotitaBlock(Posotita.elafron_apostrofos, [], 'των'),
	new PosotitaBlock(Posotita.oligon, [], 'το'),
	new PosotitaBlock(Posotita.ison, [], 'μη'),
	new PosotitaBlock(Posotita.elafron, [], 'βα'),
	new PosotitaBlock(Posotita.oligon_kentimata, [], 'σα'),
	new PosotitaBlock(Posotita.elafron, [Chronos.klasma], 'νων'),
	new MartyriaBlock(MartyriaFthongos.ni, MartyrikoSimadi.delta, false),
	// Δόξα, Και νυν
	SimpleBlock.diastoli,
	new AgogiBlock(Agogi.tacheia),
	new PosotitaBlock(Posotita.ypsili_dexia, [SecondaryCharacter.rythmos_trisimos], 'Δο'),
	new PosotitaBlock(Posotita.ison, [], 'ξα'),
	new PosotitaBlock(Posotita.ison, [], 'Πα'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison_stirigma, [SecondaryCharacter.rythmos_trisimos], 'τρι'),
	new PosotitaBlock(Posotita.ison, [], 'και'),
	new PosotitaBlock(Posotita.ison, [], 'Υι'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison_stirigma, [SecondaryCharacter.rythmos_trisimos], 'ω'),
	new PosotitaBlock(Posotita.ison, [], 'και'),
	new PosotitaBlock(Posotita.ison, [], 'Α'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.apostrofos, [], 'γι'),
	new PosotitaBlock(Posotita.oligon, [], 'ω'),
	new PosotitaBlock(Posotita.petasti, [], 'Πνευ'),
	new PosotitaBlock(Posotita.apostrofos, [], 'μα'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison, [Chronos.klasma, SecondaryCharacter.rythmos_trisimos], 'τι'),
	new MartyriaBlock(MartyriaFthongos.di, MartyrikoSimadi.delta, true),
	new PosotitaBlock(Posotita.chamili, [], 'και'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ypsili_dexia, [SecondaryCharacter.rythmos_trisimos], 'νυν'),
	new PosotitaBlock(Posotita.ison, [], 'και'),
	new PosotitaBlock(Posotita.ison, [], 'α'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.petasti, [SecondaryCharacter.rythmos_trisimos], 'ει'),
	new PosotitaBlock(Posotita.apostrofos, [], 'και'),
	new PosotitaBlock(Posotita.ison, [], 'εις'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison, [], 'τους'),
	new PosotitaBlock(Posotita.ison, [], 'αι'),
	new AgogiBlock(Agogi.metria),
	new PosotitaBlock(Posotita.ison, [SecondaryCharacter.psifiston], 'ω'),
	new PosotitaBlock(Posotita.apostrofos, [], 'νας'),
	new PosotitaBlock(Posotita.apostrofos, [], 'των'),
	new PosotitaBlock(Posotita.apostrofos, [], 'αι'),
	new PosotitaBlock(Posotita.oligon_kentimata, [SecondaryCharacter.psifiston], 'ω'),
	new PosotitaBlock(Posotita.apostrofos, [], 'νων'),
	new PosotitaBlock(Posotita.apostrofos, [], 'α'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma, SecondaryCharacter.rythmos_trisimos], 'μην'), // TODO rythmos on klasma
	new MartyriaBlock(MartyriaFthongos.ni, MartyrikoSimadi.delta, false),
	// Αγίω Πνεύματι
	new PosotitaBlock(Posotita.ison, [], 'Α'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_kentima_dipla, [], 'γι'),
	new PosotitaBlock(Posotita.oligon, [], 'ω'),
	new PosotitaBlock(Posotita.oligon, [], 'Πνευ'),
	new PosotitaBlock(Posotita.ison, [], 'μα'),
	new PosotitaBlock(Posotita.ison, [], 'τι'),
	new PosotitaBlock(Posotita.ison, [], 'το'),
	new PosotitaBlock(Posotita.petasti, [], 'ζην'),
	new PosotitaBlock(Posotita.apostrofos, [], 'τα'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_kentimata, [Alloiosi.yfesi_monogrammi, SecondaryCharacter.rythmos_trisimos], 'παν'),
	new PosotitaBlock(Posotita.elafron, [], 'τα'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.petasti, [SecondaryCharacter.rythmos_trisimos], 'φως'),
	new PosotitaBlock(Posotita.apostrofos, [], 'εκ'),
	new PosotitaBlock(Posotita.ison, [], 'φω'),
	SimpleBlock.diastoli,
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [], 'το'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ος'),
	new PosotitaBlock(Posotita.oligon, [], 'Θε'),
	new PosotitaBlock(Posotita.oligon, [], 'ος'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Alloiosi.yfesi_monogrammi], 'με'),
	new PosotitaBlock(Posotita.elafron, [Chronos.klasma], 'γας'),
	new PosotitaBlock(Posotita.ison, [], 'συν'),
	new PosotitaBlock(Posotita.oligon, [], 'Πα'),
	new PosotitaBlock(Posotita.petasti, [Alloiosi.yfesi_monogrammi], 'τρι'),
	SimpleBlock.stavros,
	new PosotitaBlock(Posotita.elafron, [], 'υ'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.oligon, [], 'μνου'),
	new PosotitaBlock(Posotita.ison, [SecondaryCharacter.omalon_diplo], 'ου'),
	new PosotitaBlock(Posotita.apostrofos, [], 'μεν'),
	new PosotitaBlock(Posotita.ison, [], 'αυ'),
	new PosotitaBlock(Posotita.elafron_apostrofos, [], 'το'),
	new PosotitaBlock(Posotita.kentimata, [], 'ο'),
	new PosotitaBlock(Posotita.ison, [], 'και'),
	new PosotitaBlock(Posotita.elafron, [], 'τω'),
	new PosotitaBlock(Posotita.oligon_kentimata, [], 'Λο'),
	new PosotitaBlock(Posotita.elafron, [Chronos.klasma], 'γω'),
	new MartyriaBlock(MartyriaFthongos.ni, MartyrikoSimadi.delta, false),
];

block_list.push(...[
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], null),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
	new PosotitaBlock(Posotita.petasti, [], 'Κυ'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ρι'),
	new PosotitaBlock(Posotita.ison, [], 'ε'),
	SimpleBlock.stavros,
	new PosotitaBlock(Posotita.oligon, [], 'ε'),
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma, SecondaryCharacter.psifiston], 'κε'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'κρα'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.apli, SecondaryCharacter.antikenoma], 'ξα'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'α'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.ison, [], 'προ'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'ο'),
	new PosotitaBlock(Posotita.oligon, [], 'ος'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_petasti, [SecondaryCharacter.rythmos_tetrasimos], 'σε'), // TODO rythmos on posotita
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ε'),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
	new PosotitaBlock(Posotita.ison, [], 'ει'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_kentima_petasti, [Chronos.klasma], 'σα'),
	new PosotitaBlock(Posotita.apostrofos_kentimata, [], 'κου'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'σο'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], null),
	new PosotitaBlock(Posotita.oligon, [Gorgon.gorgon, SecondaryCharacter.antikenoma], 'ο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ον'),
	new PosotitaBlock(Posotita.ison, [Chronos.klasma], 'μου'),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
	new PosotitaBlock(Posotita.oligon, [Gorgon.gorgon_kato], 'ει'), // TODO maybe auto select gorgon kato
	new PosotitaBlock(Posotita.oligon, [], 'σα'),
	new PosotitaBlock(Posotita.oligon, [SecondaryCharacter.psifiston, Alloiosi.yfesi_apli], 'α'),
	new PosotitaBlock(Posotita.syneches_elafron, [], 'κου'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.apli, Gorgon.gorgon], 'ου'),
	new PosotitaBlock(Posotita.ison_kentimata, [Gorgon.gorgon], 'σο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ον'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [], 'μου'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ου'),
	new PosotitaBlock(Posotita.oligon, [], 'Κυ'),
	new PosotitaBlock(Posotita.kentimata_oligon, [], 'υ'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon], 'υ'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ρι'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], null),
	new PosotitaBlock(Posotita.oligon, [Gorgon.gorgon, SecondaryCharacter.antikenoma], 'ι'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ι'),
	new PosotitaBlock(Posotita.ison, [Chronos.klasma], 'ε'),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
	new PosotitaBlock(Posotita.oligon_kentima_petasti, [], 'Κυ'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ρι'),
	new PosotitaBlock(Posotita.ison, [], 'ε'),
	SimpleBlock.stavros,
	new PosotitaBlock(Posotita.oligon, [], 'ε'),
	new PosotitaBlock(Posotita.oligon_kentimata, [SecondaryCharacter.psifiston, Alloiosi.yfesi_apli], 'κε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'κρα'),
	new PosotitaBlock(Posotita.apostrofos, [], 'α'),
	new PosotitaBlock(Posotita.apostrofos_petasti, [Chronos.klasma], 'ξα'),
	new PosotitaBlock(Posotita.syneches_elafron, [], 'προ'),
	new PosotitaBlock(Posotita.kentimata, [], 'ος'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon], 'σε'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ε'),
	new MartyriaBlock(MartyriaFthongos.ga, MartyrikoSimadi.nana, false),
	new PosotitaBlock(Posotita.elafron, [], 'ει'),
	new PosotitaBlock(Posotita.ison, [], 'σα'),
	new PosotitaBlock(Posotita.ison, [], 'κου'),
	new PosotitaBlock(Posotita.oligon_kentima_kato, [Chronos.klasma, SecondaryCharacter.psifiston], 'σο'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], 'ο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ο'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'ον'),
	SimpleBlock.diastoli,
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.oligon, [SecondaryCharacter.rythmos_trisimos], 'μου'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.digorgon], 'ου'),
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], 'ου'),
	new MartyriaBlock(MartyriaFthongos.zo, MartyrikoSimadi.varys, false),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ypsili_aristera, [Chronos.klasma, SecondaryCharacter.omalon_mono], 'προ'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'σχες'),
	new PosotitaBlock(Posotita.ison, [], 'τη'),
	new PosotitaBlock(Posotita.apostrofos, [], 'φω'),
	new PosotitaBlock(Posotita.oligon, [], 'νη'),
	new PosotitaBlock(Posotita.oligon, [SecondaryCharacter.psifiston], 'η'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], 'η'),
	new PosotitaBlock(Posotita.apostrofos, [], 'η'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [], 'τη'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'η'),
	new PosotitaBlock(Posotita.oligon, [], 'ης'),
	SimpleBlock.stavros,
	new PosotitaBlock(Posotita.oligon, [Chronos.klasma], 'δε'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon], 'η'),
	new PosotitaBlock(Posotita.apostrofos, [], 'η'),
	new PosotitaBlock(Posotita.oligon_kentimata, [], 'σε'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ω'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], 'ω'),
	new PosotitaBlock(Posotita.oligon, [Gorgon.gorgon, SecondaryCharacter.antikenoma], 'ω'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ως'),
	new PosotitaBlock(Posotita.ison, [Chronos.klasma], 'μου'),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
	new PosotitaBlock(Posotita.oligon_kentima_dipla, [], 'εν'),
	new PosotitaBlock(Posotita.ison, [], 'κε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'τω'),
	new PosotitaBlock(Posotita.oligon, [], 'κρα'),
	new PosotitaBlock(Posotita.ypsili_dexia, [Chronos.klasma, SecondaryCharacter.psifiston], 'γε'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ναι'), // TODO enarmonia fthora
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'με'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.apli, SecondaryCharacter.antikenoma], 'προ'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'ος'),
	SimpleBlock.diastoli,
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.oligon_kentima_dipla, [SecondaryCharacter.rythmos_tetrasimos], 'σε'), // TODO rythmos to the left
	new PosotitaBlock(Posotita.yporroi, [Gorgon.trigorgon], 'ε'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ε'),
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon], 'ε'),
	new PosotitaBlock(Posotita.apostrofos, [Chronos.klasma], 'ε'),
	new MartyriaBlock(MartyriaFthongos.ga, MartyrikoSimadi.nana, false),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon_kato], 'ει'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.oligon_kentimata, [], 'σα'),
	new PosotitaBlock(Posotita.ison, [Chronos.klasma], 'κου'),
	new PosotitaBlock(Posotita.apostrofos_kentimata, [Gorgon.gorgon], 'σο'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ον'),
	new PosotitaBlock(Posotita.syneches_elafron, [Chronos.klasma], 'μου'),
	new PosotitaBlock(Posotita.oligon, [], 'Κυ'),
	new PosotitaBlock(Posotita.kentimata, [], 'υ'),
	new PosotitaBlock(Posotita.petasti, [Chronos.klasma, SecondaryCharacter.psifiston], 'υ'),
	new PosotitaBlock(Posotita.apostrofos, [Gorgon.gorgon], 'υ'),
	SimpleBlock.vareia,
	new PosotitaBlock(Posotita.ison, [Chronos.klasma], 'ρι'),
	new PosotitaBlock(Posotita.yporroi, [Gorgon.gorgon], 'ι'),
	new PosotitaBlock(Posotita.oligon, [Gorgon.gorgon, SecondaryCharacter.antikenoma], 'ι'),
	new PosotitaBlock(Posotita.apostrofos, [], 'ι'),
	SimpleBlock.diastoli,
	new PosotitaBlock(Posotita.ison, [Chronos.dipli, SecondaryCharacter.rythmos_tetrasimos], 'ε'),
	new MartyriaBlock(MartyriaFthongos.pa, MartyrikoSimadi.protos, false),
]);

/**
 * @typedef Part
 * @type {object}
 * @property {number} pitch
 * @property {number} steps
 * @property {number} tempo
 * @property {number} beats
 * @property {number} block
 */

/**
 * map block index to part index
 * @type {Map<number, number}
 */
const part_map = new Map();

/**
 * @typedef MusicContext TODO include scale
 * @type {object}
 * @property {number} pitch
 * @property {number} tempo
 */

/**
 * @type {MusicContext}
 */
const music_context = {
	pitch: 0,
	tempo: Agogi.metria.tempo,
};

/**
 * @type {Part[]}
 */
const part_list = [];
// initially, ignore beats
block_list.forEach((block, block_index) => {
	const part_list_of_block = block.get_parts(music_context, block_index);
	if (part_list_of_block === null)
		return;
	part_map.set(block_index, part_list.length);
	part_list.push(...part_list_of_block);
});
// finally, apply beats
block_list.forEach((block, block_index) => {
	const part_index = part_map.get(block_index);
	if (part_index === undefined)
		return;
	block.get_times().forEach(time => {
		part_list[part_index + time.index].beats += time.beats;
	});
});

/**
 * @type {HTMLDivElement}
 */
const container_div = document.getElementById('container-div');

container_div.append(...block_list.map((block, block_index) => {
	const block_div = block.get_div();
	const part_index = part_map.get(block_index);
	if (part_index !== undefined) {
		block_div.classList.add('bz-pointer');
		block_div.addEventListener('click', () => {
			play(part_index);
		});
	}
	return block_div;
}));

const note_name_list = ['νη', 'πα', 'βου', 'γα', 'δι', 'κε', 'ζω'];
const scale = [12, 10, 8, 12, 12, 10, 8];
if (scale.reduce((acc, cur) => acc + cur, 0) !== 72)
	throw new Error('scale sum is not 72');
const partial = scale.map((cur, ind, arr) => arr.slice(0, ind).reduce((acc, cur) => acc + cur, 0));

const audio_context = new AudioContext();

/**
 * @param {number} index part
 */
function play(index) {
	if (index === part_list.length)
		return;
	const part = part_list[index];
	const octave = Math.floor(part.pitch / 7);
	const note = part.pitch - octave * 7;
	const oscillator_node = new OscillatorNode(audio_context, {
		frequency: 440 * Math.pow(2, octave + (partial[note] - partial[5] + part.steps) / 72),
		type: 'triangle', // TODO simulate musical instrument
	});
	const block_div = container_div.children[part.block];
	block_div.classList.add('bz-active');
	oscillator_node.connect(audio_context.destination);
	oscillator_node.start();
	setTimeout(() => {
		block_div.classList.remove('bz-active');
		oscillator_node.stop();
		play(index + 1);
	}, 60 / part.tempo * part.beats * 1000);
}
