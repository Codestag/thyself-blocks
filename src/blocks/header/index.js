/**
 * BLOCK: Header
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
const name = 'intro';

const title = __( 'Intro' );

const icon = icons.intro;

const keywords = [ __( 'introduction' ), __( 'text' ), __( 'thyself' ) ];

const blockAttributes = {
	heading: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-intro__heading',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-intro__content',
	},
	btnText: {
		type: 'array',
		source: 'children',
		selector: '.wp-block-thyself-intro__link',
	},
	btnLink: {
		type: 'string',
		source: 'attribute',
		selector: '.wp-block-thyself-intro__link',
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
		type: 'number',
		default: 80,
	},
	backgroundColor: {
		type: 'string',
	},
	bgBoxColor: {
		type: 'string',
	},
	bgBoxOpacity: {
		type: 'number',
	},
	imgID: {
		type: 'number',
	},
	bgImgURL: {
		type: 'string',
	},
};

const settings = {
	title: title, // Block title.
	description: __( 'Add an intro block.' ),
	icon: {
		src: icon,
	},

	keywords: keywords,
	supports: {
		align: [ 'full' ],
		html: false,
	},
	attributes: blockAttributes,

	edit: edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-thyself-intro';
		return (
			<div
				className={ className }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }
			>
				<div
					className={ `${ className }__content-cover` }
					style={ {
						backgroundImage: attributes.bgImgURL ?
							`url(${ attributes.bgImgURL })` :
							'none',
					} }
				/>
				<section className={ `${ className }__container` }>
					<div className="inner-container">
						<div className="bg-box" style={ { opacity: attributes.bgBoxOpacity, backgroundColor: attributes.bgBoxColor } } />
						<div className="content">
							<div className={ `${ className }__head` }>
								<RichText.Content
									tagName="h1"
									value={ attributes.heading }
									className={ `${ className }__heading` }
									style={ { fontSize: attributes.headingSize } }
								/>
							</div>
							<div className={ `${ className }__body` }>
								<RichText.Content
									tagName="p"
									value={ attributes.content }
									className={ `${ className }__content` }
								/>

								{ !! attributes.btnLink && (
									<a
										href={ attributes.btnLink }
										className={ classnames(
											'wp-block-thyself-intro__link',
											'thyself-button',
											{
												'has-background':
													attributes.btnBackground,
												'has-text-color':
													attributes.btnColor,
											}
										) }
										style={ {
											backgroundColor:
												attributes.btnBackground,
											color: attributes.btnColor,
										} }
									>
										{ attributes.btnText }
									</a>
								) }
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	},
};

export { name, title, icon, settings };
