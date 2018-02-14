import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../shared/wp-services/posts.service';
import { MetaInitializer } from '../../shared/yoast-seo/meta-initializer.interface';
import { MetaTagsCreator } from '../../shared/yoast-seo/meta-tags-creator';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService]
})

export class SinglePostComponent implements OnInit, MetaInitializer {
  post: any;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private metaTagsCreator: MetaTagsCreator
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.post.length > 0) {
      this.post = resolvedData.post[0];
      this.initMetaTags();
    } else {
      this.router.navigate(['error-404']);
    }
  }

  initMetaTags() {
    if (typeof this.post.yoast_meta !== 'undefined') {
      this.metaTagsCreator.createMetaTags(this.post.yoast_meta);
    }
  }
}
