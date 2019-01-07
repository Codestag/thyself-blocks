// Import external dependencies.
import classnames from 'classnames';

// Import local components.
import Controls from './controls.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { BlockControls, RichText, MediaUpload, URLInput } = wp.editor;
const { Toolbar, IconButton, Dashicon } = wp.components;

/**
 * Block edit function.
 * @param {*} props Properties availabl in the object
 * @returns {object} Block edit source
 */
const edit = props => {
	const { attributes, className, isSelected, setAttributes } = props;
	const onSelectImage = media => {
		if ( ! media || ! media.url ) {
			setAttributes( { bgImgURL: undefined, imgID: undefined } );
			return;
		}
		setAttributes( { bgImgURL: media.url, imgID: media.id } );
	};

	return (
		<Fragment>
			<Controls { ...props } />
			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ attributes.imgID }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit background' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>

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
								<RichText
									tagName="h1"
									className={ `${ className }__heading` }
									placeholder={ __( 'Write a heading' ) }
									value={ attributes.heading }
									onChange={ value =>
										setAttributes( { heading: value } )
									}
									style={ { fontSize: attributes.headingSize } }
								/>
							</div>
							<div className={ `${ className }__body` }>
								<RichText
									tagName="p"
									className={ `${ className }__content` }
									placeholder={ __( 'Write some content' ) }
									value={ attributes.content }
									onChange={ value =>
										setAttributes( { content: value } )
									}
								/>
								<RichText
									tagName="span"
									placeholder={ __( 'Add link text…' ) }
									value={ attributes.btnText }
									onChange={ value =>
										setAttributes( { btnText: value } )
									}
									style={ {
										backgroundColor: attributes.btnBackground,
										color: attributes.btnColor,
									} }
									keepPlaceholderOnFocus
									className={ classnames(
										'wp-block-thyself-intro__link',
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
						</div>
					</div>
				</section>
			</div>
		</Fragment>
	);
};

export default edit;
