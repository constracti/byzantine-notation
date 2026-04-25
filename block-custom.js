import { AbstractBlock } from './block-abstract.js';


export class CustomBlock extends AbstractBlock {

	static newline = new CustomBlock(AbstractBlock.type_newline);

	/**
	 * @returns {HTMLDivElement}
	 */
	get_div() {
		const block_div = super.get_div();
		if (this === CustomBlock.newline)
			block_div.classList.add('bz-newline');
		return block_div;
	}
}
