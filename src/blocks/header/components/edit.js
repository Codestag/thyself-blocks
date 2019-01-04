// Import external dependencies.
import classnames from 'classnames';

// Import local components.
import Controls from './controls.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RichText, URLInput, } = wp.editor;
const {
	IconButton,
	Dashicon,
} = wp.components;

/**
 * Block edit function.
 * @param {*} props Properties availabl in the object
 * @returns {object} Block edit source
 */
const edit = props => {
	const { attributes, className, isSelected, setAttributes } = props;

	return (
		<Fragment>
			<Controls { ...props } />
			<div className={ className }>
				<RichText
					tagName="h1"
					className={ `${ className }__heading` }
					placeholder={ __( 'Write a heading' ) }
					value={ attributes.heading }
					onChange={ value => setAttributes( { heading: value } ) }
				/>
				<RichText
					tagName="p"
					className={ `${ className }__content` }
					placeholder={ __( 'Write some content' ) }
					value={ attributes.content }
					onChange={ value => setAttributes( { content: value } ) }
				/>
				<RichText
					tagName="span"
					placeholder={ __( 'Add link text…' ) }
					value={ attributes.btnText }
					onChange={ value => setAttributes( { btnText: value } ) }
					style={ {
						backgroundColor: attributes.btnBackground,
						color: attributes.btnColor,
					} }
					keepPlaceholderOnFocus
					className={ classnames(
						'wp-block-thyself-header__link',
						'thyself-button',
						{
							'has-background': attributes.btnBackground,
							'has-text-color': attributes.btnColor,
						}
					) }
				/>
				{ isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ event => event.preventDefault() }
					>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ attributes.btnLink }
							onChange={ value =>
								setAttributes( { btnLink: value } )
							}
						/>
						<IconButton
							icon="editor-break"
							label={ __( 'Apply' ) }
							type="submit"
						/>
					</form>
				) }
			</div>
		</Fragment>
	);
};

export default edit;
