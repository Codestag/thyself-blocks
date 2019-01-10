// Import external dependencies.
import classnames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import icons from './../../../icons';
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { decodeEntities } = wp.htmlEntities;
const { withSelect } = wp.data;
const { InspectorControls, BlockAlignmentToolbar, BlockControls } = wp.editor;
const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	TextControl,
	Spinner,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const MAX_POSTS_COLUMNS = 4;

/**
 * Block edit function.
 * @param {*} props Properties availabl in the object
 * @returns {object} Block edit source
 */
class PostsGridEdit extends Component {
	constructor() {
		super( ...arguments );

		this.handleReadMoreText = this.handleReadMoreText.bind( this );
		this.toggleState = this.toggleState.bind( this );
	}

	toggleState( key ) {
		const { setAttributes } = this.props;
		const value = this.props.attributes[ key ];

		setAttributes( {
			[ key ]: ! value,
		} );
	}

	handleReadMoreText( value ) {
		const { setAttributes } = this.props;

		setAttributes( { readMoreText: value } );
	}

	render() {
		const { attributes, categoriesList, setAttributes, latestPosts } = this.props;
		const {
			displayPostDate,
			displayPostExcerpt,
			displayReadMore,
			displayFeaturedImage,
			displayPostAuthor,
			readMoreText,
			align,
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
		} = attributes;

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Posts Grid Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display Post Date' ) }
						checked={ displayPostDate }
						onChange={ () => this.toggleState( 'displayPostDate' ) }
					/>
					<ToggleControl
						label={ __( 'Display Post Excerpt' ) }
						checked={ displayPostExcerpt }
						onChange={ () => this.toggleState( 'displayPostExcerpt' ) }
					/>
					<ToggleControl
						label={ __( 'Display Post Author' ) }
						checked={ displayPostAuthor }
						onChange={ () => this.toggleState( 'displayPostAuthor' ) }
					/>
					<ToggleControl
						label={ __( 'Display Featured Image' ) }
						checked={ displayFeaturedImage }
						onChange={ () => this.toggleState( 'displayFeaturedImage' ) }
					/>
					<ToggleControl
						label={ __( 'Display Read More Link' ) }
						checked={ displayReadMore }
						onChange={ () => this.toggleState( 'displayReadMore' ) }
					/>
					{ displayReadMore &&
						<TextControl
							label={ __( 'Read More text' ) }
							value={ readMoreText || '' }
							onChange={ ( nextValue ) => this.handleReadMoreText( nextValue ) }
						/>
					}
					{ postLayout !== '' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
				</PanelBody>
			</InspectorControls>
		);

		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'Loading Posts...' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const layoutControls = [
			{
				icon: icons.postsHorizontal,
				title: __( 'Horizontal View' ),
				onClick: () => setAttributes( { postLayout: 'horizontal' } ),
				isActive: postLayout === 'horizontal',
			},
			{
				icon: icons.postsVertical,
				title: __( 'Vertical View' ),
				onClick: () => setAttributes( { postLayout: 'vertical' } ),
				isActive: postLayout === 'vertical',
			},
		];

		return (
			<Fragment>
				{ inspectorControls }

				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
						controls={ [ 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>

				<ul
					className={ classnames( this.props.className, {
						'is-horizontal': postLayout === 'horizontal',
						'is-vertical': postLayout === 'vertical',
						[ `columns-${ columns }` ]: postLayout !== '',
					} ) }
				>
					{ displayPosts.map( ( post, i ) => (
						<li key={ i }>
							{ ( post[ 'thyself/featured_image_src' ] ) && ( attributes.displayFeaturedImage ) && (
								<figure className={ `${ this.props.className }__thumbnail` }>
									<img src={ post[ 'thyself/featured_image_src' ] } alt={ decodeEntities( post.title.rendered.trim() ) } />
								</figure>
							) }

							<div className={ `${ this.props.className }__content` }>
								<h3 className={ `${ this.props.className }__title` }>
									<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
								</h3>

								<div className={ `${ this.props.className }__meta` }>
									{ displayPostDate && post.date_gmt &&
									<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
										{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
									</time>
									}
									{ displayPostAuthor &&
										<a
											href={ post[ 'thyself/author_data' ].author_link }
											className={ `${ this.props.className }__author` }
											target="_blank" rel="noopener noreferrer"
										>
											<img src={ post[ 'thyself/author_data' ].avatar } alt={ post[ 'thyself/author_data' ].display_name } />
											<span>{ post[ 'thyself/author_data' ].display_name }</span>
										</a>
									}
								</div>

								{ displayPostExcerpt && post.excerpt.rendered &&
								<div className={ `${ this.props.className }__excerpt` } dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
								}

								{ displayReadMore &&
									<p className={ `${ this.props.className }__read-more` }>
										<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( readMoreText ) || __( 'Continue Reading →' ) }</a>
									</p>
								}
							</div>
						</li>
					)
					) }
				</ul>

			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const { postsToShow, order, orderBy, categories } = props.attributes;
	const { getEntityRecords } = select( 'core' );

	const latestPostsQuery = pickBy( {
		categories,
		order,
		orderby: orderBy,
		per_page: postsToShow,
		_fields: [
			'id',
			'date_gmt',
			'link',
			'title',
			'excerpt',
			'featured_media',
			'author',
			'thyself/featured_image_src',
			'thyself/author_data',
		],
	}, ( value ) => ! isUndefined( value ) );

	const categoriesListQuery = {
		per_page: 100,
		_fields: [ 'id', 'name', 'parent' ],
	};

	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
		categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesListQuery ),
	};
} )( PostsGridEdit );
