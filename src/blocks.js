// Get registerBlockType dependency.
const { registerBlockType } = wp.blocks;
const { getCategories, setCategories } = wp.blocks;

// Import icons object.
import icons from './icons';

/**
 * Register custom block category.
 */
// Category slug & title.
const category = {
	slug: 'thyself',
	title: 'Thyself Blocks',
};
setCategories( [
	{
		slug: category.slug,
		title: category.title,
		icon: icons.logo,
	},
	...getCategories().filter( ( { slug } ) => slug !== 'thyself' ),
] );

/**
 * Include Gutenberg Blocks.
 */
import * as header from './blocks/header';

/**
 * Register blocks.
 */
export function registerBlocks() {
	[
		header,
	].forEach( ( block ) => {
		if ( ! block ) {
			return;
		}

		const { name, settings } = block;

		registerBlockType( `thyself/${ name }`, { category: category.slug, ...settings } );
	} );
}
registerBlocks();
