# Angular 5 + Wordpress starter theme

Wordpress starter theme with Angular 5 app integration.

This project is prepared to use with Advanced Custom Fields plugin (PRO version is also supported). It provides:
- basic theme configuration
- services available by default in Wordpress and shared by ACF REST API
- structure of components to work with wordpress templates basing on idea of custom selector field

## WP Setup

1. This theme configuration requires Wordpress with installed plugins:
   - https://wordpress.org/plugins/advanced-custom-fields (or PRO version)
   - https://wordpress.org/plugins/acf-to-rest-api

2. It requires the following custom structure of permalinks: `/post/%postname%/`. You can set them in dashboard (Settings -> Permalinks).

3. Before running app you need to create `src/config.json` file basing on `src/config.json.dist`.

4. Wordpress pages needs to have select field to choose template. Name of that field is configurable on `src/app/page-base/page-base.component.ts` as `acfTemplateSelectorFieldName` property. Then you can create templates as components in path: `src/app/page-base/templates/` that will be loaded basing on selected template name in dashboard. Nice!

### Development server

Run `ng serve` for a dev server - `http://localhost:4200/`.

### Build

Run `ng build --prod --deploy-url="/wp-content/themes/{YOUR_THEME_NAME}/dist"` to build the project. 

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Contributions

Pull requests are welcome