<?php
require 'classes/PageTemplater.php';
require 'classes/YoastMetaTagsLoader.php';
require 'classes/ThemeConfigurator.php';

$theme = ThemeConfigurator::getInstance();
$theme->initialize();
