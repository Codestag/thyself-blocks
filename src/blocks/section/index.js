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
const { InnerBlocks } = wp.editor;

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
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
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
		const { attributes, insertBlocksAfter } = props;
		const className = 'wp-block-thyself-section';
		const containerClass = 'wp-block-thyself-section';
		return (
			<div
				className={ className }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }
			>
				<div className={ `${ containerClass }__content` }>
					<InnerBlocks.Content />
				</div>
				{ attributes.imageURL && (
					<div className={ `${ containerClass }__image` }>
						<img src={ attributes.imageURL } alt="" />
					</div>
				) }
			</div>
		);
	},
};

export { name, title, icon, settings };
