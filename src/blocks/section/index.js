/**
 * BLOCK: Section
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
const name = 'section';

const title = __( 'Section' );

const icon = icons.section;

const keywords = [ __( 'section' ), __( 'blocks' ), __( 'thyself' ) ];

const blockAttributes = {
	imageURL: {
		type: 'string',
	},
	imageID: {
		type: 'number',
	},
	showImage: {
		type: 'boolean',
		default: true,
	},
	backgroundColor: {
		type: 'string',
		default: '#4F4F4F',
	},
	textColor: {
		type: 'string',
		default: '#ffffff',
	},
};

const settings = {
	title: title, // Block title.
	description: __( 'Add a section block.' ),
	icon: {
		src: icon,
	},

	keywords: keywords,
	supports: {
		align: [ 'wide', 'full' ],
	},
	styles: [
		{ name: 'default', label: __( 'Default' ) },
		{ name: 'flip', label: __( 'Flipped' ) },
	],
	attributes: blockAttributes,

	edit: edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-thyself-section';
		return (
			<div className={ className } >

			</div>
		);
	},
};

export { name, title, icon, settings };
