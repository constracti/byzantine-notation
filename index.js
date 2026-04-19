const font_object = {
	byzantina: 'bz-byzantina',
	loipa: 'bz-loipa', // TODO top margin
	fthores: 'bz-fthores',
	ison: 'bz-ison',
	chronos: 'bz-chronos',
};

const color_object = {
	red: 'bz-red',
};

/**
 * @param {string} font
 * @param {string} char
 * @returns {HTMLSpanElement}
 */
function custom_span(font, char) {
	const span = document.createElement('span');
	span.classList.add(font);
	span.innerHTML = char;
	return span;
}


/**
 * @typedef Letter
 * @type {object}
 * @property {string} font
 * @property {string} char
 */


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

	static vareia = new SimpleBlock('vareia', font_object.byzantina, '\\', null);
	static diastoli = new SimpleBlock('diastoli', font_object.byzantina, 'o', null);
	static stavros = new SimpleBlock('stavros', font_object.fthores, '\'', color_object.red);

	/**
	 * @param {string} name
	 * @param {string} font
	 * @param {string} char
	 * @param {?string} color
	 */
	constructor(name, font, char, color) {
		super(null);
		this.name = name;
		this.font = font;
		this.char = char;
		this.color = color;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		const symbol_div = document.createElement('div');
		symbol_div.classList.add('bz-symbol');
		const span = document.createElement('span');
		span.classList.add(this.font);
		if (this.color !== null)
			span.classList.add(this.color);
		span.innerHTML = this.char;
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
		const span = document.createElement('span');
		span.classList.add(font_object.byzantina);
		span.classList.add(color_object.red);
		span.innerHTML = '`';
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
	 * @type {string}
	 */
	font;

	/**
	 * @type {string}
	 */
	char;

	static ni = new MartyriaFthongos('ni', 0, font_object.byzantina, '7');
	static di = new MartyriaFthongos('di', 4, font_object.byzantina, '4');

	/**
	 * @param {string} name
	 * @param {number} note
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, note, font, char) {
		this.name = name;
		this.note = note;
		this.font = font;
		this.char = char;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = document.createElement('span');
		span.classList.add(this.font);
		span.classList.add(color_object.red);
		span.innerHTML = this.char;
		return span;
	}
}


class MartyrikoSimadi {

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

	static delta = new MartyrikoSimadi('delta', font_object.byzantina, '&');

	/**
	 * @param {string} name
	 * @param {string} font
	 * @param {string} char
	 */
	constructor(name, font, char) {
		this.name = name;
		this.font = font;
		this.char = char;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_span() {
		const span = document.createElement('span');
		span.classList.add(this.font);
		span.classList.add(color_object.red);
		span.innerHTML = this.char;
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
		if (this.posotita === Posotita.oligon_kentimata && this.gorgon === Gorgon.gorgon) {
			symbol_div.append(custom_span(font_object.byzantina, 'V'));
		} else {
			symbol_div.append(this.posotita.get_span());
			if (this.gorgon !== null)
				symbol_div.append(this.gorgon.get_span(this.posotita.thin));
		}
		this.secondary_list.forEach(secondary => {
			if (secondary === this.gorgon)
				return;
			symbol_div.append(secondary.get_span(this.posotita.thin));
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
			this.gorgon.tuple.forEach((value, index) => {
				time_list.push({index: this.posotita.move_list.length - 1 + index - 1, beats: value - 1});
			})
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
	 * @type {string}
	 */
	char;

	/**
	 * @type {boolean}
	 */
	thin;

	// isotita
	static ison = new Posotita('ison', [0], font_object.byzantina, 'a', false);
	static ison_petasti = new Posotita('ison-petasti', [0], font_object.byzantina, 'A', false);
	static ison_stirigma = new Posotita('ison-stirigma', [0], font_object.loipa, '0', false);
	// anavasi
	static oligon = new Posotita('oligon', [+1], font_object.byzantina, 's', false);
	static petasti = new Posotita('petasti', [+1], font_object.byzantina, 'S', false);
	static kentimata = new Posotita('kentimata', [+1], font_object.byzantina, 'x', true);
	// static oligon_kentima_kato = new PosotitaCharaktiras('oligon-kentima-kato', [+2], font_object.byzantina, 'd', false);
	static oligon_kentimata = new Posotita('oligon-kentimata', [+1, +1], font_object.byzantina, 'v', false);
	static oligon_kentima_dipla = new Posotita('oligon-kentima-dipla', [+2], font_object.byzantina, 'sC', false);
	static ypsili_dexia = new Posotita('ypsili-dexia', [+4], font_object.byzantina, 'g', false);
	// katavasi
	static apostrofos = new Posotita('apostrofos', [-1], font_object.byzantina, 'j', true);
	static apostrofos_petasti = new Posotita('apostrofos-petasti', [-1], font_object.byzantina, 'J', false);
	static elafron = new Posotita('elafron', [-2], font_object.byzantina, 'k', false);
	static elafron_apostrofos = new Posotita('elafron-apostrofos', [-3], font_object.byzantina, 'l', false);
	static chamili = new Posotita('chamili', [-4], font_object.byzantina, ';', false);
	// symploki
	static syneches_elafron = new Posotita('syneches-elafron', [-1, -1], font_object.byzantina, 'h', false);
	// TODO center text below syneches elafron
	static apostrofos_kentimata = new Posotita('apostrofos-kentimata', [-1, +1], font_object.byzantina, '-', false);

	/**
	 * @param {string} name
	 * @param {number[]} move_list
	 * @param {string} font
	 * @param {string} char
	 * @param {boolean} thin
	 */
	constructor(name, move_list, font, char, thin) {
		this.name = name;
		this.move_list = move_list;
		this.font = font;
		this.char = char;
		this.thin = thin;
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
	 * @type {Letter}
	 */
	primary_letter;

	/**
	 * @type {Letter}
	 */
	secondary_letter;

	static metria = new Agogi('metria', 120, {font: font_object.chronos, char: 'k'}, {font: font_object.chronos, char: 'K'});
	static tacheia = new Agogi('tacheia', 180, {font: font_object.chronos, char: 'l'}, {font: font_object.chronos, char: 'L'});

	/**
	 * @param {string} name
	 * @param {number} tempo
	 * @param {Letter} primary_letter
	 * @param {Letter} secondary_letter
	 */
	constructor(name, tempo, primary_letter, secondary_letter) {
		this.name = name;
		this.tempo = tempo;
		this.primary_letter = primary_letter;
		this.secondary_letter = secondary_letter;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_primary_span() {
		const span = document.createElement('span');
		span.classList.add(this.primary_letter.font);
		span.classList.add(color_object.red);
		span.innerHTML = this.primary_letter.char;
		return span;
	}

	/**
	 * @returns {HTMLSpanElement}
	 */
	get_secondary_span() {
		const span = document.createElement('span');
		span.classList.add(this.secondary_letter.font);
		span.classList.add(color_object.red);
		span.innerHTML = this.secondary_letter.char;
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
	 * @type {Letter}
	 */
	letter;

	/**
	 * @type {?Letter}
	 */
	letter_thin;

	static type_chronos = 'chronos';
	static type_gorgon = 'gorgon';
	static type_kallopismos = 'kallopismos';
	static type_rythmos = 'rythmos';
	static type_alloiosi = 'alloiosi';

	static psifiston = new SecondaryCharacter('psifiston', SecondaryCharacter.type_kallopismos, {font: font_object.byzantina, char: '/'}, null);
	static rythmos_trisimos = new SecondaryCharacter('rythmos-trisimos', SecondaryCharacter.type_rythmos, {font: font_object.fthores, char: '6'}, {font: font_object.fthores, char: '^'});

	/**
	 * @param {string} name
	 * @param {string} type
	 * @param {Letter} letter
	 * @param {?Letter} letter_thin
	 */
	constructor(name, type, letter, letter_thin) {
		this.name = name;
		this.type = type;
		this.letter = letter;
		this.letter_thin = letter_thin;
	}

	is_red() {
		return this.type === SecondaryCharacter.type_rythmos;
	}

	/**
	 * @param {boolean} thin
	 * @returns {HTMLSpanElement}
	 */
	get_span(thin) {
		const span = document.createElement('span');
		const letter = thin && this.letter_thin !== null ? this.letter_thin : this.letter;
		span.classList.add(letter.font);
		if (this.is_red())
			span.classList.add(color_object.red);
		span.innerHTML = letter.char;
		return span;
	}
}


class Chronos extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	beats;

	static klasma = new Chronos('klasma', 1, {font: font_object.byzantina, char: 'u'}, {font: font_object.byzantina, char: 'i'});

	/**
	 * @param {string} name
	 * @param {number} beats
	 * @param {Letter} letter
	 * @param {?Letter} letter_thin
	 */
	constructor(name, beats, letter, letter_thin) {
		super(name, SecondaryCharacter.type_chronos, letter, letter_thin);
		this.beats = beats;
	}
}


class Gorgon extends SecondaryCharacter {

	/**
	 * @type {number[]}
	 */
	tuple;

	static gorgon = new Gorgon('gorgon', [1/2, 1/2], {font: font_object.byzantina, char: 'e'}, null);

	/**
	 * @param {string} name
	 * @param {number[]} tuple
	 * @param {Letter} letter
	 * @param {?Letter} letter_thin
	 */
	constructor(name, tuple, letter, letter_thin) {
		super(name, SecondaryCharacter.type_gorgon, letter, letter_thin);
		this.tuple = tuple;
	}
}


class Alloiosi extends SecondaryCharacter {

	/**
	 * @type {number}
	 */
	steps;

	static yfesi_apli = new Alloiosi('yfesi_apli', -2, {font: font_object.byzantina, char: 'y'}, null);
	static yfesi_monogrammi = new Alloiosi('yfesi_monogrammi', -4, {font: font_object.byzantina, char: 'Y'}, null);

	/**
	 * 
	 * @param {string} name
	 * @param {number} steps
	 * @param {Letter} letter
	 * @param {?Letter} letter_thin
	 */
	constructor(name, steps, letter, letter_thin) {
		super(name, SecondaryCharacter.type_alloiosi, letter, letter_thin);
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
	new PosotitaBlock(Posotita.oligon_kentimata, [Gorgon.gorgon, Alloiosi.yfesi_monogrammi], 'χε'), // TODO gorgon
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
];

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
// TODO finally, apply beats
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
