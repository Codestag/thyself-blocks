<?php
/**
 * Server-side rendering of the `thyself/posts` block.
 *
 * @package thyself
 */

if ( ! function_exists( 'register_block_type' ) ) {
	return;
}

/**
 * Registers the `thyself/posts` block on server.
 */
function register_block_thyself_posts() {
	register_block_type(
		'thyself/posts', array(
			'attributes'      => array(
				'categories'           => array(
					'type' => 'string',
				),
				'className'            => array(
					'type' => 'string',
				),
				'postsToShow'          => array(
					'type'    => 'number',
					'default' => 5,
				),
				'displayPostDate'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayReadMore'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayFeaturedImage' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayCategories' => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'readMoreText'         => array(
					'type'    => 'string',
					'default' => '..',
				),
				'postLayout'           => array(
					'type'    => 'string',
					'default' => 'list',
				),
				'columns'              => array(
					'type'    => 'number',
					'default' => 2,
				),
				'align'                => array(
					'type'    => 'string',
					'default' => '',
				),
				'order'                => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'              => array(
					'type'    => 'string',
					'default' => 'date',
				),
			),
			'render_callback' => 'render_block_thyself_posts',
		)
	);
}

add_action( 'init', 'register_block_thyself_posts' );

/**
 * Renders the `thyself/posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_thyself_posts( $attributes ) {
	$recent_posts = wp_get_recent_posts(
		array(
			'numberposts' => $attributes['postsToShow'],
			'post_status' => 'publish',
			'order'       => $attributes['order'],
			'orderby'     => $attributes['orderBy'],
			'category'    => isset( $attributes['categories'] ) ? $attributes['categories'] : false,
		), 'OBJECT'
	);

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id   = $post->ID;
		$title     = get_the_title( $post_id );
		$author_id = $post->post_author;

		$list_items_markup .= '<li>';

		// Get the post thumbnail .
		$post_thumb_id = get_post_thumbnail_id( $post_id );
		$show_featured = $attributes['displayFeaturedImage'];

		if ( ! $title ) {
			$title = __( '(Untitled)', 'thyself' );
		}

		// Display the post thumbnail.
		if ( $post_thumb_id && $show_featured ) {
			$list_items_markup .= sprintf(
				'<figure class="wp-block-thyself-posts__thumbnail"><a href="%1$s" rel="bookmark">%2$s</a></figure>',
				esc_url( get_permalink( $post_id ) ),
				wp_get_attachment_image( $post_thumb_id, 'large' )
			);
		}

		$list_items_markup .= '<div class="wp-block-thyself-posts__content">';

		// Display post title.
		$list_items_markup .= sprintf(
			'<h3 class="wp-block-thyself-posts__title"><a href="%1$s">%2$s</a></h3>',
			esc_url( get_permalink( $post_id ) ),
			esc_html( $title )
		);

		$date_markup = '';

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$date_markup = sprintf(
				'<time datetime="%1$s">%2$s</time>',
				esc_attr( get_the_date( 'c', $post_id ) ),
				esc_html( get_the_date( '', $post_id ) )
			);
		}

		$list_items_markup .= '<div class="wp-block-thyself-posts__meta">' . $date_markup . '</div>';

		if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {
			$excerpt = sprintf( '<p class="wp-block-thyself-posts__excerpt">%1$s &nbsp;', get_post_field( 'post_excerpt', $post_id ) );

			if ( empty( $excerpt ) ) {
				$excerpt = sprintf( '<p class="wp-block-thyself-posts__excerpt">%1$s &nbsp;', wp_trim_words( $post->post_content, 55 ) );
			}

			if ( isset( $attributes['displayReadMore'] ) && $attributes['displayReadMore'] ) {
				$excerpt .= sprintf(
					'<a class="wp-block-thyself-posts__read-more" href="%1$s" rel="bookmark">%2$s</a></p>',
					get_permalink( $post_id ),
					$attributes['readMoreText']
				);
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			if ( ! empty( $excerpt ) ) {
				$list_items_markup .= sprintf(
					'<div class="wp-block-thyself-posts__summary">%1$s</div>',
					$excerpt
				);
			}
		}

		if ( isset( $attributes['displayCategories'] ) && $attributes['displayCategories'] ) {
			$categories_list = get_the_category_list( esc_html__( ', ', 'thyself' ) );

			$list_items_markup .= '<div class="wp-block-thyself-posts__categories">' . $categories_list . '</div>';
		}

		// Close .wp-block-thyself-posts__content container.
		$list_items_markup .= '</div>';
	}

	$class = "wp-block-thyself-posts align{$attributes['align']} is-{$attributes['postLayout']} columns-{$attributes['columns']}";

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr( $class ),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Register REST fields related to 'thyself/posts' block.
 *
 * @return void
 */
function block_thyself_posts_rest_fields() {
	register_rest_field(
		'post',
		'thyself/featured_image_src',
		array(
			'get_callback' => function( $object ) {
				$image_array = wp_get_attachment_image_src(
					$object['featured_media'],
					'large',
					false
				);
				return $image_array[0];
			},
		)
	);

	register_rest_field(
		'post',
		'thyself/category_data',
		array(
			'get_callback' => function( $object ) {
				$category_data[] = get_the_category_list( esc_html__( ', ', 'thyself' ) );
				return $category_data;
			},
		)
	);
}

add_action( 'rest_api_init', 'block_thyself_posts_rest_fields' );
