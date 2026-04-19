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

	static get_empty_span() {
		return document.createElement('span');
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
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

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
	name;

	/**
	 * @type {Glyph}
	 */
	glyph;

	static protos = new MartyrikoSimadi('protos', new Glyph(Glyph.font_byzantina, '!'));
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
	 * @type {SecondaryCharacter[]}
	 */
	secondary_list;

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
	 * @type {string}
	 */
	font;

	/**
	 * @type {Glyph}
	 */
	glyph;

	// isotita
	static ison = new Posotita('ison', [0], new Glyph(Glyph.font_byzantina, 'a'), false);
	static ison_petasti = new Posotita('ison-petasti', [0], new Glyph(Glyph.font_byzantina, 'A'), false);
	static ison_stirigma = new Posotita('ison-stirigma', [0], new Glyph(Glyph.font_loipa, '0'), false);
	// anavasi
	static oligon = new Posotita('oligon', [+1], new Glyph(Glyph.font_byzantina, 's'), false);
	static petasti = new Posotita('petasti', [+1], new Glyph(Glyph.font_byzantina, 'S'), false);
	static kentimata = new Posotita('kentimata', [+1], new Glyph(Glyph.font_byzantina, 'x'), true);
	// static oligon_kentima_kato = new Posotita('oligon-kentima-kato', [+2], new Glyph(Glyph.font_byzantina, 'd'), false);
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], new Glyph(Glyph.font_byzantina, 'sC'), false);
	static oligon_petasti = new Posotita('oligon-petasti', [+2], new Glyph(Glyph.font_byzantina, 'D'), false);
	static oligon_kentima_petasti = new Posotita('oligon-kentima-petasti', [+3], new Glyph(Glyph.font_byzantina, 'F'), false);
	static ypsili_dexia = new Posotita('ypsili-dexia', [+4], new Glyph(Glyph.font_byzantina, 'g'), false);
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], new Glyph(Glyph.font_byzantina, 'j'), true);
	static apostrofos_petasti = new Posotita('apostrofos-petasti', [-1], new Glyph(Glyph.font_byzantina, 'J'), false);
	static elafron = new Posotita('elafron', [-2], new Glyph(Glyph.font_byzantina, 'k'), false);
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], new Glyph(Glyph.font_byzantina, 'l'), false);
	static chamili = new Posotita('chamili', [-4], new Glyph(Glyph.font_byzantina, ';'), false);
	// symploki
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], new Glyph(Glyph.font_byzantina, 'v'), false);
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], new Glyph(Glyph.font_byzantina, 'h'), false);
	static yporroi = new Posotita('yporroi', [-1, -1], new Glyph(Glyph.font_byzantina, '\''), true);
	// TODO center text below syneches elafron
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], new Glyph(Glyph.font_byzantina, '-'), false);

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {Glyph} glyph
	 * @param {boolean} thin
	 */
	constructor(name, move_list, glyph, thin) {
		this.name = name;
		this.move_list = move_list;
		this.glyph = glyph;
		this.thin = thin;
	}

	/**
	 * @param {PosotitaBlock} block
	 * @returns {HTMLSpanElement}
	 */
	get_span(block) {
		if (this === Posotita.oligon_kentimata && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, 'V').get_span();
		if (this === Posotita.yporroi && block.gorgon === Gorgon.gorgon)
			return new Glyph(Glyph.font_byzantina, ':').get_span();
		return this.glyph.get_span();
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
		if (block.posotita === Posotita.oligon_kentimata && this === Gorgon.gorgon)
			return Glyph.get_empty_span();
		if (block.posotita === Posotita.yporroi && this === Gorgon.gorgon)
			return Glyph.get_empty_span();
		if (block.posotita.is_petasti() && this === Chronos.klasma)
			return new Glyph(Glyph.font_byzantina, 'I').get_span();
		const glyph = block.posotita.thin && this.glyph_thin !== null ? this.glyph_thin : this.glyph;
		const span = glyph.get_span();
		if (this.is_red())
			span.classList.add(color_object.red);
		return span;
	}
}


class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, new Glyph(Glyph.font_byzantina, 'u'), new Glyph(Glyph.font_byzantina, 'i'));
	static apli = new Chronos('apli', 1, new Glyph(Glyph.font_byzantina, '8'), new Glyph(Glyph.font_byzantina, '*'));

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
}


class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], new Glyph(Glyph.font_byzantina, 'e'), new Glyph(Glyph.font_byzantina, 'r'));

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
}


class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, new Glyph(Glyph.font_byzantina, 'y'), null);
	static yfesi_monogrammi = new Alloiosi('yfesi_monogrammi', -4, new Glyph(Glyph.font_byzantina, 'Y'), null);

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
