import { NgModule } from '@angular/core';

import { PostResolver } from './resolvers/post.resolver';
import { PageResolver } from './resolvers/page.resolver';

@NgModule({
  providers: [
    PostResolver,
    PageResolver
  ]
})

export class WPServicesModule { }
