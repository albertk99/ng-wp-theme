import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RootUrlInterceptor } from './shared/root-url-interceptor';
import { MetaTagsCreator } from './shared/yoast-seo/meta-tags-creator';

import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { CategoryComponent } from './posts/category/category.component';
import { TagComponent } from './posts/tag/tag.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';

import { PageBaseComponent } from './pages/page-base.component';
import { PageTemplateDirective } from './pages/directives/page-template.directive';
import { SafePipe } from './shared/pipes/safe.pipe';

// template components
import { DefaultComponent } from './pages/templates/default/default.component';
import { Page404Component } from './pages/templates/page-404/page-404.component';
import { ExampleTemplateComponent } from './pages/templates/example-template/example-template.component';
import { ContactComponent } from './pages/templates/contact/contact.component';
import { ContactFormComponent } from './pages/templates/contact/contact-form/contact-form.component';

const templateComponents = [
  DefaultComponent,
  Page404Component,
  ExampleTemplateComponent,
  ContactComponent
];

@NgModule({
  declarations: [
    AppComponent,
    PageTemplateDirective,
    SafePipe,
    PostListComponent,
    CategoryComponent,
    TagComponent,
    SinglePostComponent,
    PageBaseComponent,
    ...templateComponents,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RootUrlInterceptor,
      multi: true
    },
    MetaTagsCreator
  ],
  entryComponents: [
    ...templateComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
