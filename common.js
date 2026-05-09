/**
 * @import {Fthongos} from './fthongos.js'
 * @import {Klimaka} from './klimaka.js'
 */

/**
 * @typedef {object} MusicContext
 * @property {number} melos_pitch
 * @property {?Fthongos} ison_fthongos
 * @property {number} tempo beats per minute
 * @property {Klimaka} klimaka
 */

/**
 * @typedef {object} Part
 * @property {number} melos_steps distance from tuner
 * @property {?number} ison_steps distance from tuner
 * @property {number} tempo beats per minute
 * @property {number} beats
 * @property {number} block index in global list
 */

export default {};
