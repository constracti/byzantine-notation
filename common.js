import { Klimaka } from './klimaka.js';

/**
 * @typedef MusicContext TODO chroes
 * @type {object}
 * @property {number} pitch fthongos pitch
 * @property {number} tempo beats per minute
 * @property {Klimaka} klimaka
 * @property {number} base_pitch klimaka base fthongos pitch
 * @property {number} base_steps klimaka base distance from tuner
 */

/**
 * @typedef Part
 * @type {object}
 * @property {number} steps distance from tuner
 * @property {number} tempo beats per minute
 * @property {number} beats
 * @property {number} block index in global list
 */
