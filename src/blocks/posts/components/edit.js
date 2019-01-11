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
const { InspectorControls, BlockAlignmentToolbar, BlockControls, MediaUpload, PanelColorSettings } = wp.editor;
const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	TextControl,
	Spinner,
	ToggleControl,
	Toolbar,
	IconButton,
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
			displayCategories,
			readMoreText,
			align,
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
			bgColor,
			bgImgURL,
			bgOpacity,
			imgId,
			txtColor,
		} = attributes;

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		const onSelectImage = media => {
			if ( ! media || ! media.url ) {
				setAttributes( { bgImgURL: undefined, imgID: undefined } );
				return;
			}
			setAttributes( { bgImgURL: media.url, imgId: media.id } );
		};

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Posts Settings' ) }>
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
						label={ __( 'Display Featured Image' ) }
						checked={ displayFeaturedImage }
						onChange={ () => this.toggleState( 'displayFeaturedImage' ) }
					/>
					<ToggleControl
						label={ __( 'Display Post Categories' ) }
						checked={ displayCategories }
						onChange={ () => this.toggleState( 'displayCategories' ) }
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
							min={ 1 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
					{ bgImgURL !== '' &&
						<RangeControl
							label={ __( 'Background Opacity' ) }
							value={ bgOpacity }
							onChange={ ( value ) => setAttributes( { bgOpacity: value } ) }
							min={ 0.1 }
							max={ 1.0 }
							step={ 0.1 }
						/>
					}
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.txtColor,
							onChange: value => setAttributes( { txtColor: value } ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.bgColor,
							onChange: value => setAttributes( { bgColor: value } ),
							label: __( 'Background Color' ),
						},
					] }
				/>

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
					<Toolbar controls={ layoutControls } >
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ attributes.imgId }
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

				<div className={ this.props.className }
					style={ {
						backgroundColor: attributes.bgColor,
					} } >
					<div className={ `${ this.props.className }__cover` }
						style={ {
							backgroundImage: attributes.bgImgURL ?
								`url(${ attributes.bgImgURL })` :
								'none',
							opacity: attributes.bgOpacity,
						} } />
					<ul
						className={ classnames( `${ this.props.className }__container`, {
							'is-horizontal': postLayout === 'horizontal',
							'is-vertical': postLayout === 'vertical',
							[ `columns-${ columns }` ]: postLayout !== '',
						} ) }
						style={ {
							color: attributes.txtColor,
						} }
					>
						{ displayPosts.map( ( post, i ) => (
							<li key={ i }>
								{ ( post[ 'thyself/featured_image_src' ] ) && ( attributes.displayFeaturedImage ) && (
									<figure className={ `${ this.props.className }__thumbnail` }>
										<img src={ post[ 'thyself/featured_image_src' ] } alt={ decodeEntities( post.title.rendered.trim() ) } />
									</figure>
								) }

								<div className={ `${ this.props.className }__content` }>
									<div className={ `${ this.props.className }__meta` }>
										{ displayPostDate && post.date_gmt &&
										<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
											{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
										</time> }
									</div>

									<h3 className={ `${ this.props.className }__title` }>
										<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
									</h3>

									<div className={ `${ this.props.className }__summary` }>
										{ displayPostExcerpt && post.excerpt.raw &&
										<p className={ `${ this.props.className }__excerpt` }>
											{ post.excerpt.raw !== '' ? post.excerpt.raw : post.content.raw.slice( 0, 200 ).replace( /<[^>]+>/g, '' ) }&nbsp;
											{ displayReadMore && readMoreText && ( <a className={ `${ this.props.className }__read-more` } href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( readMoreText ) || __( '..' ) }</a> ) }
										</p>
										}
									</div>

									{ ( post[ 'thyself/category_data' ] ) && ( attributes.displayCategories ) && (
										<div className={ `${ this.props.className }__categories` } dangerouslySetInnerHTML={ { __html: post[ 'thyself/category_data' ] } } />
									) }

								</div>
							</li>
						)
						) }
					</ul>
				</div>

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
			'content',
			'featured_media',
			'thyself/featured_image_src',
			'thyself/category_data',
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
