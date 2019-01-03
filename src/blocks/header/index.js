/**
 * BLOCK: Header
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import Styles.
import './styles/style.scss';
import './styles/editor.scss';
//  Import componenets.
import Edit from './components/edit';
import icons from './../../icons';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { InnerBlocks } = wp.editor;

/**
 * Block data.
 */
const name = 'header';

const title = __( 'Header' );

const icon = icons.header;

const keywords = [
	__( 'heading' ),
	__( 'text' ),
	__( 'thyself' ),
];

const settings = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: title, // Block title.
	description: __( 'Add a header block.' ),
	icon: {
		src: icon,
	},

	keywords: keywords,
	supports: {
		align: [ 'wide', 'full' ],
		html: false,
	},

	edit: Edit,

	save() {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>thyself-blocks</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
};

export { name, title, icon, settings };
