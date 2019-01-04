/**
 * BLOCK: Header
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// External dependencies.
import classnames from 'classnames';

//  Import Styles.
import './styles/style.scss';
import './styles/editor.scss';
//  Import componenets.
import edit from './components/edit';
import icons from './../../icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText } = wp.editor;

/**
 * Block data.
 */
const name = 'header';

const title = __( 'Header' );

const icon = icons.header;

const keywords = [ __( 'heading' ), __( 'text' ), __( 'thyself' ) ];

const blockAttributes = {
	heading: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-header__heading',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-header__content',
	},
	btnText: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-header__link',
	},
	btnLink: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-thyself-header__link',
		attribute: 'href',
	},
	btnColor: {
		type: 'string',
	},
	btnBackground: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	headingSize: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
};

const settings = {
	title: title, // Block title.
	description: __( 'Add a header block.' ),
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
		const className = 'wp-block-thyself-header';
		return (
			<div className={ className }>
				<RichText.Content
					tagName="h1"
					value={ attributes.heading }
					className={ `${ className }__heading` }
				/>
				<RichText.Content
					tagName="p"
					value={ attributes.content }
					className={ `${ className }__content` }
				/>

				{ !! attributes.btnLink && (
					<a
						href={ attributes.btnLink }
						className={ classnames(
							'wp-block-thyself-header__link',
							'thyself-button',
							{
								'has-background': attributes.btnBackground,
								'has-text-color': attributes.btnColor,
							}
						) }
						style={ {
							backgroundColor: attributes.btnBackground,
							color: attributes.btnColor,
						} }
					>
						{ attributes.btnText }
					</a>
				) }
			</div>
		);
	},
};

export { name, title, icon, settings };
