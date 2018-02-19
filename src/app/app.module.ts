import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RootUrlInterceptor } from './shared/root-url-interceptor';
import { MetaTagsCreator } from './shared/yoast-seo/meta-tags-creator';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CategoryComponent } from './posts/category/category.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PageBaseComponent } from './pages/page-base.component';
import { DefaultComponent } from './pages/templates/default/default.component';
import { Page404Component } from './pages/templates/page-404/page-404.component';
import { ExampleTemplateComponent } from './pages/templates/example-template/example-template.component';

import { PageTemplateDirective } from './pages/directives/page-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    CategoryComponent,
    SinglePostComponent,
    PageBaseComponent,
    DefaultComponent,
    Page404Component,
    ExampleTemplateComponent,
    PageTemplateDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RootUrlInterceptor,
      multi: true
    },
    MetaTagsCreator
  ],
  entryComponents: [// @todo move to page module
    DefaultComponent,
    Page404Component,
    ExampleTemplateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
