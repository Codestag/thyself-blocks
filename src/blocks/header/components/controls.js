// WordPress Dependencies.
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, RangeControl } = wp.components;
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
				<PanelBody>
					<RangeControl
						label={ __( 'Heading font size' ) }
						initialPosition={ attributes.headingSize }
						value={ attributes.headingSize || '' }
						min={ 10 }
						max={ 200 }
						onChange={ size =>
							setAttributes( { headingSize: size } )
						}
						beforeIcon="size"
					/>
				</PanelBody>
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
						{
							value: attributes.btnColor,
							onChange: btnColor => setAttributes( { btnColor } ),
							label: __( 'Button Color' ),
						},
						{
							value: attributes.btnBackground,
							onChange: btnBackground =>
								setAttributes( { btnBackground } ),
							label: __( 'Button Background Color' ),
						},
					] }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
