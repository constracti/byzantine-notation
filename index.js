import { Block } from './block.js';
import { Klimaka } from './klimaka.js';
import { Agogi } from './character-agogi.js';

import { block_list } from './demo.js';

/**
 * @import {MusicContext} from './common.js'
 * @import {Part} from './common.js'
 */

/**
 * map block index to part index
 * @type {Map<number, number>}
 */
const part_map = new Map();

/**
 * map block index to block div
 * @type {Map<number, HTMLDivElement>}
 */
const block_map = new Map();

/**
 * @type {MusicContext}
 */
const music_context = {
	melos_pitch: 0,
	ison_fthongos: null,
	tempo: Agogi.metria.get_tempo(),
	klimaka: Klimaka.get_default(),
};

/**
 * @type {Part[]}
 */
const part_list = [];
// initially, ignore beats
block_list.forEach((block, block_index) => {
	const part_list_of_block = block.get_parts(music_context, block_index);
	if (part_list_of_block.length > 0)
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
const container_div = document.getElementById('bz-container');

/**
 * @type {?HTMLDivElement}
 */
let group_div = null;

block_list.forEach((block, block_index) => {
	const block_div = block.get_div();
	const part_index = part_map.get(block_index);
	if (part_index !== undefined) {
		block_div.classList.add('bz-pointer');
		block_div.addEventListener('click', () => {
			play(part_index);
		});
	}
	if (block.type !== Block.type_newline) {
		if (group_div === null || !block.keep_with_previous()) {
			group_div = document.createElement('div');
			group_div.classList.add('bz-group');
			container_div.append(group_div);
		}
		group_div.append(block_div);
	} else {
		if (group_div !== null)
			group_div.classList.add('bz-grow');
		container_div.append(block_div);
	}
	block_map.set(block_index, block_div);
});

const audio_context = new AudioContext();

/**
 * @param {number} index part
 */
function play(index) {
	if (index === part_list.length)
		return;
	const part = part_list[index];
	const melos_node = new OscillatorNode(audio_context, {
		frequency: 440 * Math.pow(2, part.melos_steps / 72),
		type: 'triangle', // TODO simulate musical instrument
	});
	const ison_node = new OscillatorNode(audio_context, {
		frequency: 440 * Math.pow(2, (part.ison_steps ?? part.melos_steps) / 72),
		type: 'sine',
	});
	const block_div = block_map.get(part.block);
	block_div.classList.add('bz-active'); // TODO causes faulty character rendering in macos safari
	melos_node.connect(audio_context.destination);
	ison_node.connect(audio_context.destination);
	melos_node.start();
	ison_node.start();
	setTimeout(() => {
		block_div.classList.remove('bz-active');
		melos_node.stop();
		ison_node.stop();
		play(index + 1);
	}, 60 / part.tempo * part.beats * 1000);
}
