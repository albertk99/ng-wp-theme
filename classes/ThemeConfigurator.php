<?php
class ThemeConfigurator
{
    private static $instance;
    public static $settings;

    private function __construct() {}
    private function __clone() {}

    public function initialize()
    {
        add_theme_support('post-thumbnails');
        add_action('init', array($this, 'initACFOptionsPage'));
        add_action('init', array($this, 'setupImagesSizes'));
        add_action('init', array($this, 'registerMenus'));
        add_action('admin_menu', array($this, 'hideMenuElements'));
        add_action('init', array($this, 'initThemeSettings'));
        $this->initPageTemplater();
        $this->initYoastMeta();
    }

    private function initYoastMeta() {
        if (class_exists('WPSEO_Frontend')) {
            add_filter('rest_prepare_post', array($this, 'addYoastMetaFields'), 10, 3);
            add_filter('rest_prepare_page', array($this, 'addYoastMetaFields'), 10, 3);
        }
    }

    private function initPageTemplater()
    {
        $pt = PageTemplater::get_instance();
        $pt->templates = $this->getTemplatesFromConfig();
    }

    private function getTemplatesFromConfig()
    {
        $config = json_decode(file_get_contents(__DIR__ . '/../src/config.json'), true);
        $templates = array();

        foreach ($config['pageTemplates'] as $key => $value) {
            $templates[$value] = $value; // @todo check if is .php suffix required?
        }

        return $templates;
    }

    public function hideMenuElements()
    {
        remove_menu_page('edit-comments.php');
    }

    public function setupImagesSizes()
    {
        #add_image_size( 'hd_images', 1920, 99999 );
    }

    public function registerMenus()
    {
        register_nav_menus(
            array(
                'header-menu' => __('Header menu'),
                'footer-menu' => __('Footer menu'),
            )
        );
    }

    public function initACFOptionsPage()
    {
        if (function_exists('acf_add_options_page')) {
            acf_add_options_page(array(
                'page_title' => 'Theme settings',
                'menu_title' => 'Theme settings',
                'menu_slug' => 'theme-settings',
                'redirect' => false,
            ));
        }
    }

    public function initThemeSettings()
    {
        if (function_exists('get_fields')) {
            self::$settings = get_fields('options');
        }
    }

    public function addYoastMetaFields($data, $post, $context)
    {
        $yoastMeta = array(
            (object) array(
                'name' => 'description',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_metadesc', true),
            ),
            (object) array(
                'name' => 'keywords',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_metakeywords', true),
            ),
            (object) array(
                'property' => 'og:locale',
                'content' => get_locale(),
            ),
            (object) array(
                'property' => 'og:type',
                'content' => is_single() ? 'article' : 'website',
            ),
            (object) array(
                'property' => 'og:title',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_opengraph-title', true),
            ),
            (object) array(
                'property' => 'og:description',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_opengraph-description', true),
            ),
            (object) array(
                'property' => 'og:url',
                'content' => get_permalink(),
            ),
            (object) array(
                'property' => 'og:site_name',
                'content' => get_bloginfo('name'),
            ),
            (object) array(
                'property' => 'og:image',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_opengraph-image', true),
            ),
            (object) array(
                'name' => 'twitter:title',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_twitter-title', true),
            ),
            (object) array(
                'name' => 'twitter:description',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_twitter-description', true),
            ),
            (object) array(
                'name' => 'twitter:image',
                'content' => get_post_meta($post->ID, '_yoast_wpseo_twitter-image', true),
            )
        );
        /**
         * @TODO processing following tags:
         *
         *   'yoast_wpseo_focuskw'              => get_post_meta($post->ID, '_yoast_wpseo_focuskw', true),
         *   'yoast_wpseo_title'                => get_post_meta($post->ID, '_yoast_wpseo_title', true),
         *   'yoast_wpseo_linkdex'              => get_post_meta($post->ID, '_yoast_wpseo_linkdex', true),
         *   'yoast_wpseo_meta-robots-noindex'  => get_post_meta($post->ID, '_yoast_wpseo_meta-robots-noindex', true),
         *   'yoast_wpseo_meta-robots-nofollow' => get_post_meta($post->ID, '_yoast_wpseo_meta-robots-nofollow', true),
         *   'yoast_wpseo_meta-robots-adv'      => get_post_meta($post->ID, '_yoast_wpseo_meta-robots-adv', true),
         *   'yoast_wpseo_redirect'             => get_post_meta($post->ID, '_yoast_wpseo_redirect', true)
         */
        $data->data['yoast_meta'] = (array) $yoastMeta;

        return $data;
    }

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            $class = __CLASS__;
            self::$instance = new $class();
        }

        return self::$instance;
    }
}
