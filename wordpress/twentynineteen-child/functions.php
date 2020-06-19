<?php
add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
function enqueue_parent_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
}

function makeSingularWord($s)
{
    if (strlen($s) == 0) {
        return true;
    }

    return rtrim($s, 's');
}

/**
 * Helper functions:
 */

// This function is a shortcut for setting up post types
function customPostType($basicname, $title, $icon = 'dashicons-book', $public = true, $extraArgs = null)
{
    // Generally title is the plural name
    if ($public) {
        $supports = array('title', 'editor', 'excerpt', 'thumbnail', 'revisions');
    } else {
        $supports = array('title', 'thumbnail');
    }

    $singularName = makeSingularWord($basicname);
    $singularName = ucfirst($singularName);

    $args = array(
        'labels' => array(
            'name' => $title,
            'singular_name' => $singularName,
            'add_new' => "Add $singularName",
            'add_new_item' => "Add New $singularName",
            'new_item' => 'Add New'
        ),
        'label' => ucfirst($basicname),
        'public' => $public,
        'publicly_queryable' => $public,
        'show_in_rest' => true,
        'show_ui' => true,
        'query_var' => $public,
        'menu_icon' => $icon,
        'rewrite' => array('slug' => $basicname, 'with_front' => false),
        'capability_type' => 'post',
        'hierarchical' => false,
        'menu_position' => 6,
        'supports' => $supports,
        'has_archive' => false
    );

    if ($extraArgs) {
        $args = array_merge($args, $extraArgs);
    }

    register_post_type($basicname, $args);
}

function customTaxonomy($taxonomy, $object, $label, $slug, $extraArgs = null)
{
    $args = array(
        'hierarchical' => true,
        'label' => $label,
        'query_var' => true,
        'rewrite' => array(
            'slug' => $slug,
            'with_front' => false
        )
    );

    if ($extraArgs) {
        $args = array_merge($args, $extraArgs);
    }

    register_taxonomy($taxonomy, $object, $args);
}

/**
 * Add custom post types and taxonomies
 */
add_action('init', 'registerCptAndTax');
function registerCptAndTax()
{

    $caseStudyArgs = [
        'labels' => [
            'name' => 'Case Studies',
            'singular_name' => 'Case Study',
            'add_new' => "Add Case Study",
            'add_new_item' => "Add New Case Study",
            'new_item' => 'Add New',
        ],
    ];

    customPostType('casestudy', 'Case Studies', 'dashicons-analytics', true, $caseStudyArgs);
    customTaxonomy('case_study_categories', 'casestudy', 'Categories', 'category');

}

/**
 * Filters nav urls so they are relative paths for Gatsby
 */
function filter_nav_menu_items($menu) {

    $site_url = get_site_url()."/";

    $current_url = $menu->url; //grab the current url link
    $new_url = str_replace($site_url, '/', $current_url); //replace the base url with a '/'
    $menu->url = $new_url; //save the new url to the <code>url</code> property in the menu item object

    return $menu; //return the filtered object
}

add_filter('wp_setup_nav_menu_item', 'filter_nav_menu_items', 1);

// Save custom fields as jsons in the /components directory
add_filter('acf/settings/save_json', function () {
    return get_stylesheet_directory() . '/components';
});


add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point($paths)
{

    // remove original path (optional)
    unset($paths[0]);

    // append path
    $paths[] = get_stylesheet_directory() . '/components';

    // return
    return $paths;

}