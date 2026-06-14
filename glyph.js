export class Glyph {

	/**
	 * @type {string}
	 */
	#alt;

	/**
	 * @type {string}
	 */
	#src;

	static color_red = 'bz-red';
	static color_blue = 'bz-blue';

	static ison = new Glyph('ison');
	static oligon_ison = new Glyph('oligon-ison');
	static petasti_ison = new Glyph('petasti-ison');

	static oligon = new Glyph('oligon');
	static petasti = new Glyph('petasti');
	static kentimata = new Glyph('kentimata');
	static kentima = new Glyph('kentima');
	static oligon_kentima_kato = new Glyph('oligon-kentima-kato');
	static petasti_oligon = new Glyph('petasti-oligon');
	static oligon_kentima = new Glyph('oligon-kentima');
	static petasti_kentima = new Glyph('petasti-kentima');
	static oligon_ypsili_dexia = new Glyph('oligon-ypsili-dexia');
	static petasti_ypsili_dexia = new Glyph('petasti-ypsili-dexia');
	static oligon_ypsili_aristera = new Glyph('oligon-ypsili-aristera');
	static petasti_kentima_ypsili_kentro = new Glyph('petasti-kentima-ypsili-kentro');

	static apostrofos = new Glyph('apostrofos');
	static oligon_apostrofos = new Glyph('oligon-apostrofos');
	static petasti_apostrofos = new Glyph('petasti-apostrofos');
	static elafron = new Glyph('elafron');
	static petasti_elafron = new Glyph('petasti-elafron');
	static elafron_apostrofos = new Glyph('elafron-apostrofos');
	static chamili = new Glyph('chamili');

	static oligon_kentimata = new Glyph('oligon-kentimata');
	static kentimata_oligon = new Glyph('kentimata-oligon');
	static syneches_elafron = new Glyph('syneches-elafron');
	static yporroi = new Glyph('yporroi');
	static ison_kentimata = new Glyph('ison-kentimata');
	static apostrofos_kentimata = new Glyph('apostrofos-kentimata');
	static elafron_kentimata = new Glyph('elafron-kentimata');

	static klasma = new Glyph('klasma');
	static apli = new Glyph('apli');
	static dipli = new Glyph('dipli');
	static tripli = new Glyph('tripli');
	static gorgon = new Glyph('gorgon');
	static gorgon_prin = new Glyph('gorgon-prin');
	static gorgon_meta = new Glyph('gorgon-meta');
	static digorgon = new Glyph('digorgon');
	static digorgon_prin = new Glyph('digorgon-prin');
	static digorgon_mesi = new Glyph('digorgon-mesi');
	static digorgon_meta = new Glyph('digorgon-meta');
	static trigorgon = new Glyph('trigorgon');

	static vareia = new Glyph('vareia');
	static psifiston = new Glyph('psifiston');
	static antikenoma = new Glyph('antikenoma');
	static omalon_mono = new Glyph('omalon-mono');
	static omalon_diplo = new Glyph('omalon-diplo');
	static syndesmos = new Glyph('syndesmos');

	static yfesi_apli = new Glyph('yfesi-apli');
	static yfesi_monogrammi = new Glyph('yfesi-monogrammi');
	static yfesi_digrammi = new Glyph('yfesi-digrammi');
	static yfesi_trigrammi = new Glyph('yfesi-trigrammi');
	static diesi_apli = new Glyph('diesi-apli');
	static diesi_monogrammi = new Glyph('diesi-monogrammi');
	static diesi_digrammi = new Glyph('diesi-digrammi');
	static diesi_trigrammi = new Glyph('diesi-trigrammi');

	static diatoniki_ni = new Glyph('diatoniki-ni');
	static diatoniki_pa = new Glyph('diatoniki-pa');
	static diatoniki_vou = new Glyph('diatoniki-vou');
	static diatoniki_ga = new Glyph('diatoniki-ga');
	static diatoniki_di = new Glyph('diatoniki-di');
	static diatoniki_ke = new Glyph('diatoniki-ke');
	static malaki_di = new Glyph('malaki-di');
	static skliri_pa = new Glyph('skliri-pa');
	static skliri_di = new Glyph('skliri-di');

	static zygos = new Glyph('zygos');
	static spathi = new Glyph('spathi');
	static kliton = new Glyph('kliton');

	static martyria_ga_kato = new Glyph('martyria-ga-kato');
	static martyria_di_kato = new Glyph('martyria-di-kato');
	static martyria_ke_kato = new Glyph('martyria-ke-kato');
	static martyria_zo = new Glyph('martyria-zo');
	static martyria_ni = new Glyph('martyria-ni');
	static martyria_pa = new Glyph('martyria-pa');
	static martyria_vou = new Glyph('martyria-vou');
	static martyria_ga = new Glyph('martyria-ga');
	static martyria_di = new Glyph('martyria-di');
	static martyria_ke = new Glyph('martyria-ke');
	static martyria_tonos = new Glyph('martyria-tonos');

	static simadi_teleies = new Glyph('simadi-teleies');
	static simadi_alfa = new Glyph('simadi-alfa');
	static simadi_lambda = new Glyph('simadi-lambda');
	static simadi_nana = new Glyph('simadi-nana');
	static simadi_varys = new Glyph('simadi-varys');
	static simadi_delta = new Glyph('simadi-delta');
	static simadi_defteros = new Glyph('simadi-defteros');
	static simadi_skliro = new Glyph('simadi-skliro');

	static isokratima_melos = new Glyph('isokratima-melos');
	static isokratima_di_kato = new Glyph('isokratima-di-kato');
	static isokratima_ke_kato = new Glyph('isokratima-ke-kato');
	static isokratima_zo = new Glyph('isokratima-zo');
	static isokratima_ni = new Glyph('isokratima-ni');
	static isokratima_pa = new Glyph('isokratima-pa');
	static isokratima_vou = new Glyph('isokratima-vou');
	static isokratima_ga = new Glyph('isokratima-ga')
	static isokratima_di = new Glyph('isokratima-di');
	static isokratima_ke = new Glyph('isokratima-ke');
	static isokratima_zo_ano = new Glyph('isokratima-zo-ano');

	static ichos = new Glyph('ichos');
	static ichos_plagios = new Glyph('ichos-plagios');
	static ichos_protos = new Glyph('ichos-protos');
	static ichos_defteros = new Glyph('ichos-defteros');
	static ichos_tritos = new Glyph('ichos-tritos');
	static ichos_tetartos = new Glyph('ichos-tetartos');
	static ichos_plagios_protos = new Glyph('ichos-plagios-protos');
	static ichos_plagios_defteros = new Glyph('ichos-plagios-defteros');
	static ichos_varys = new Glyph('ichos-varys');
	static ichos_plagios_tetartos = new Glyph('ichos-plagios-tetartos');

	static vathmida_ni = new Glyph('vathmida-ni');
	static vathmida_pa = new Glyph('vathmida-pa');
	static vathmida_vou = new Glyph('vathmida-vou');
	static vathmida_ga = new Glyph('vathmida-ga');
	static vathmida_di = new Glyph('vathmida-di');
	static vathmida_ke = new Glyph('vathmida-ke');
	static vathmida_zo = new Glyph('vathmida-zo');

	static diastoli = new Glyph('diastoli');
	static rythmos_trisimos = new Glyph('rythmos-trisimos');
	static rythmos_tetrasimos = new Glyph('rythmos-tetrasimos');
	static stavros = new Glyph('stavros');

	static agogi_metria = new Glyph('agogi-metria');
	static agogi_metria_martyria = new Glyph('agogi-metria-martyria');
	static agogi_tacheia = new Glyph('agogi-tacheia');
	static agogi_tacheia_martyria = new Glyph('agogi-tacheia-martyria');

	/**
	 * @param {string} alt
	 */
	constructor(alt) {
		this.#alt = alt;
		this.#src = `glyphs/${alt}.svg`;
	}

	/**
	 * @returns {HTMLImageElement}
	 */
	get_img() {
		const img = document.createElement('img');
		img.classList.add('bz-glyph');
		img.src = this.#src;
		img.alt = this.#alt;
		return img;
	}
}
