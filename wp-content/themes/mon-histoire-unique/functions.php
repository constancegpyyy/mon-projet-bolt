<?php
// Fonctions du thème
function mhu_setup() {
    // Support des fonctionnalités WordPress
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('woocommerce');
    
    // Menus
    register_nav_menus(array(
        'primary' => 'Menu Principal',
        'footer' => 'Menu Footer'
    ));
}
add_action('after_setup_theme', 'mhu_setup');

// Types de contenu personnalisés
function mhu_custom_post_types() {
    // Type de contenu pour les livres personnalisés
    register_post_type('custom_book', array(
        'labels' => array(
            'name' => 'Livres Personnalisés',
            'singular_name' => 'Livre Personnalisé'
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true
    ));
}
add_action('init', 'mhu_custom_post_types');

// Champs personnalisés avec ACF
function mhu_acf_fields() {
    if(function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_book_details',
            'title' => 'Détails du livre',
            'fields' => array(
                array(
                    'key' => 'field_book_type',
                    'label' => 'Type de livre',
                    'name' => 'book_type',
                    'type' => 'select',
                    'choices' => array(
                        'narrative' => 'Histoire narrative',
                        'educational' => 'Histoire éducative'
                    )
                ),
                array(
                    'key' => 'field_book_category',
                    'label' => 'Catégorie',
                    'name' => 'book_category',
                    'type' => 'taxonomy'
                ),
                array(
                    'key' => 'field_book_price',
                    'label' => 'Prix',
                    'name' => 'book_price',
                    'type' => 'number'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'custom_book'
                    )
                )
            )
        ));
    }
}
add_action('acf/init', 'mhu_acf_fields');

// WooCommerce - Personnalisation du processus de commande
function mhu_add_custom_checkout_fields($fields) {
    $fields['order']['book_customization'] = array(
        'type' => 'text',
        'label' => "Prénom de l'enfant",
        'required' => true
    );
    return $fields;
}
add_filter('woocommerce_checkout_fields', 'mhu_add_custom_checkout_fields');

// Scripts et styles
function mhu_enqueue_scripts() {
    wp_enqueue_style('mhu-style', get_stylesheet_uri());
    wp_enqueue_script('mhu-script', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'mhu_enqueue_scripts');