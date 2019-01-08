// Import local components.
import Controls from './controls.js';

/**
 * WordPress dependencies
 */
const { Fragment } = wp.element;
const { InnerBlocks, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

/**
 * Block edit function.
 * @param {*} props Properties availabl in the object
 * @returns {object} Block edit source
 */
const edit = props => {
	const { attributes, className, setAttributes, insertBlocksAfter } = props;
	const containerClass = 'wp-block-thyself-section';

	return (
		<Fragment>
			<Controls { ...props } />

			<div
				className={ className }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }
			>
				<div className={ `${ containerClass }__content` }>
					{ ( typeof insertBlocksAfter !== 'undefined' ) ? <InnerBlocks /> : '' }
				</div>
				<div
					className={ `${ containerClass }__image` }
					style={ {
						backgroundImage: `url(${ attributes.imageURL })`,
					} }
				>
					<MediaUpload
						onSelect={ media => {
							setAttributes( {
								imageID: media.id,
								imageURL: media.url,
							} );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ ! attributes.imageID ? (
									<Dashicon icon="format-image" />
								) : (
									<Dashicon icon="edit" />
								) }
							</Button>
						) }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default edit;
