/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

/**
 * Block edit function.
 */
const edit = props => {
	const { attributes, className, isSelected, setAttributes } = props;

	return (
		<Fragment>
			<div className={ className }>
				<p>Something something</p>
			</div>
		</Fragment>
	);
};

export default edit;
