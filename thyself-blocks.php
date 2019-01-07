<?php
/**
 * Plugin Name: Thyself Blocks - Content Blocks
 * Plugin URI: https://bitbucket.org/codestag/thyself-blocks/
 * Description: Content blocks for building beautiful pages with Thyself theme.
 * Author: codestag
 * Author URI: https://codestag.com
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package thyself
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
