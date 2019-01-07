/**
 * BLOCK: Posts
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// External dependencies.
import classnames from 'classnames';

//  Import Styles.
import './styles/editor.scss';
import './styles/style.scss';
//  Import componenets.
import edit from './components/edit';
import icons from './../../icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText } = wp.editor;

/**
 * Block data.
 */
const name = 'posts';

const title = __( 'Posts' );

const icon = icons.posts;

const keywords = [ __( 'posts' ), __( 'text' ), __( 'thyself' ) ];

const blockAttributes = {};

const settings = {
	title: title, // Block title.
	description: __( 'Add a posts block.' ),
	icon: {
		src: icon,
	},

	keywords: keywords,
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},
	attributes: blockAttributes,

	edit: edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-thyself-posts';
		return (
			<div className={ className } >

			</div>
		);
	},
};

export { name, title, icon, settings };
