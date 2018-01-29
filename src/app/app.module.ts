import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RootUrlInterceptor } from './shared/root-url-interceptor';

import { AppComponent } from './app.component';
import { PostListComponent } from './examples/post-list/post-list.component';
import { SinglePostComponent } from './examples/single-post/single-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageBaseComponent } from './page-base/page-base.component';
import { DefaultComponent } from './page-base/templates/default/default.component';
import { ExampleTemplateComponent } from './page-base/templates/example-template/example-template.component';
import { PageTemplateDirective } from './page-base/directives/page-template.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    SinglePostComponent,
    PageNotFoundComponent,
    PageBaseComponent,
    DefaultComponent,
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
    }
  ],
  entryComponents: [// @todo move to page module
    DefaultComponent,
    ExampleTemplateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
