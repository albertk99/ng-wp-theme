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
        $this->initAPIExtender();
    }

    private function initAPIExtender() {
        $rae = new RESTAPIExtender();
        $rae->registerRoutes();
    }

    private function initYoastMeta() {
        $yoastInitializer = new YoastMetaTagsLoader();
        $yoastInitializer->initMetaTags();
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

    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            $class = __CLASS__;
            self::$instance = new $class();
        }

        return self::$instance;
    }
}
