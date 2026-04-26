import { Fthongos } from './fthongos.js';
import { Klimaka } from './klimaka.js';
import { Agogi } from './agogi.js';

import { block_list } from './demo.js';

/**
 * @typedef {import('./common.js').MusicContext} MusicContext
 */

/**
 * @typedef {import('./common.js').Part} Part
 */

/**
 * map block index to part index
 * @type {Map<number, number}
 */
const part_map = new Map();

/**
 * @type {MusicContext}
 */
const music_context = {
	pitch: Fthongos.ni.index,
	tempo: Agogi.metria.tempo,
	scale: Klimaka.diatoniki,
	steps: Klimaka.diatoniki.steps,
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

const audio_context = new AudioContext();

/**
 * @param {number} index part
 */
function play(index) {
	if (index === part_list.length)
		return;
	const part = part_list[index];
	const oscillator_node = new OscillatorNode(audio_context, {
		frequency: 440 * Math.pow(2, part.steps / 72),
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
