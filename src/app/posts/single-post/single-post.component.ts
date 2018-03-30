import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../shared/wp-services/posts.service';
import { GalleryInjectorService } from '../../shared/gallery/gallery-injector.service';
import { MetaInitializer } from '../../shared/yoast-seo/meta-initializer.interface';
import { MetaTagsCreator } from '../../shared/yoast-seo/meta-tags-creator';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService, GalleryInjectorService]
})

export class SinglePostComponent implements OnInit, AfterViewInit, MetaInitializer {
  post: any;
  @ViewChild('postContent') private postContent: ElementRef;

  constructor(
    private postsService: PostsService,
    private galleryInjectorService: GalleryInjectorService,
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

  ngAfterViewInit() {
    this.galleryInjectorService.initializeGalleries(this.postContent);
  }

  public initMetaTags() {
    if (typeof this.post.yoast_meta !== 'undefined') {
      this.metaTagsCreator.createMetaTags(this.post.yoast_meta);
    }
  }
}
