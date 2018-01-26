import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseUrlInterceptor } from './http/base-url.interceptor';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';
import { PostListComponent } from './examples/post-list/post-list.component';
import { SinglePostComponent } from './examples/single-post/single-post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
