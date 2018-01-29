import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PageBaseComponent } from './pages/page-base.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PostResolver } from './shared/wp-services/resolvers/post.resolver';
import { PageResolver } from './shared/wp-services/resolvers/page.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:slug',
    component: SinglePostComponent,
    resolve: {
      post: PostResolver
    }
  },
  {
    path: ':slug',
    component: PageBaseComponent,
    resolve: {
      page: PageResolver
    }
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PostResolver, PageResolver]
})

export class AppRoutingModule { }
