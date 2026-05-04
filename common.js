/**
 * @typedef {import('./klimaka.js').Klimaka} Klimaka
 */

/**
 * @typedef MusicContext
 * @type {object}
 * @property {number} pitch fthongos pitch
 * @property {number} tempo beats per minute
 * @property {Klimaka} klimaka
 */

/**
 * @typedef Part
 * @type {object}
 * @property {number} steps distance from tuner
 * @property {number} tempo beats per minute
 * @property {number} beats
 * @property {number} block index in global list
 */
