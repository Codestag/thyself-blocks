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

	return (
		<Fragment>
			<Controls { ...props } />
			<BlockControls>
				<Toolbar>
				</Toolbar>
			</BlockControls>

			<div className={ className } >
			</div>
		</Fragment>
	);
};

export default edit;
