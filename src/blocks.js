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
	},
	...getCategories().filter( ( { slug } ) => slug !== 'thyself' ),
] );

/**
 * Include Gutenberg Blocks.
 */
import * as intro from './blocks/intro';
import * as posts from './blocks/posts';
import * as section from './blocks/section';

/**
 * Register blocks.
 */
export function registerBlocks() {
	[
		intro,
		posts,
		section,
	].forEach( ( block ) => {
		if ( ! block ) {
			return;
		}

		const { name, settings } = block;

		registerBlockType( `thyself/${ name }`, { category: category.slug, ...settings } );
	} );
}
registerBlocks();
