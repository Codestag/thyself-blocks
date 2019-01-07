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
				<PanelBody
					title={ __( 'Text Settings' ) }
					className="blocks-font-size"
				>
					<RangeControl
						label={ __( 'Heading Font Size (in px)' ) }
						initialPosition={ attributes.headingSize }
						value={ attributes.headingSize || '' }
						min={ 10 }
						max={ 200 }
						onChange={ size => setAttributes( { headingSize: size } ) }
					/>
					<RangeControl
						label={ __( 'Content Font Size (in px)' ) }
						initialPosition={ attributes.contentSize }
						value={ attributes.contentSize || '' }
						min={ 1 }
						max={ 200 }
						onChange={ size => setAttributes( { contentSize: size } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Settings' ) }>
					<RangeControl
						label={ __( 'Background Box Opacity' ) }
						initialPosition={ attributes.bgBoxOpacity }
						value={ attributes.bgBoxOpacity || '' }
						min={ 0.1 }
						max={ 1.0 }
						step={ 0.1 }
						onChange={ size => setAttributes( { bgBoxOpacity: size } ) }
						beforeIcon="visibility"
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
							value: attributes.bgBoxColor,
							onChange: bgBoxColor =>
								setAttributes( { bgBoxColor } ),
							label: __( 'Background Box Color' ),
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
