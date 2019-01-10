/**
 * BLOCK: Posts
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import Styles.
import './styles/editor.scss';
import './styles/style.scss';
//  Import componenets.
import edit from './components/edit';
import icons from './../../icons';

const { __ } = wp.i18n; // Import __() from wp.i18n

/**
 * Block data.
 */
const name = 'posts';

const title = __( 'Posts' );

const icon = icons.posts;

const keywords = [ __( 'posts' ), __( 'text' ), __( 'thyself' ) ];

const settings = {
	title: title, // Block title.
	description: __( 'Add a posts block.' ),
	icon: {
		src: icon,
	},

	keywords: keywords,
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
