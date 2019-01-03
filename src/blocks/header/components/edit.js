/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const { attributes, className, isSelected, setAttributes } = this.props;

		return [
			// eslint-disable-next-line react/jsx-key
			<Fragment>
				<div className={ className }>
					<p>— Hello from the backend.</p>
					<p>
						CGB BLOCK: <code>thyself-blocks</code> is a new
						Gutenberg block
					</p>
					<p>
						It was created via{ ' ' }
						<code>
							<a href="https://github.com/ahmadawais/create-guten-block">
								create-guten-block
							</a>
						</code>
						.
					</p>
				</div>
			</Fragment>,
		];
	}
}

export default Edit;
