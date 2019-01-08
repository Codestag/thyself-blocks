// WordPress Dependencies.
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;

/**
 * Create controls for block.
 * @param {*} props Properties available in the block
 * @returns {object} Controls for the block
 */
const Controls = props => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.textColor,
							onChange: textColor => setAttributes( { textColor } ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.backgroundColor,
							onChange: backgroundColor =>
								setAttributes( { backgroundColor } ),
							label: __( 'Background Color' ),
						},
					] }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
