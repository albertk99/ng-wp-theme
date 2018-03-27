import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../shared/wp-services/posts.service';
import { MetaInitializer } from '../../shared/yoast-seo/meta-initializer.interface';
import { MetaTagsCreator } from '../../shared/yoast-seo/meta-tags-creator';
import { Image, PlainGalleryConfig, PlainGalleryStrategy, LineLayout, DescriptionStrategy, Description, GridLayout } from 'angular-modal-gallery';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService]
})

export class SinglePostComponent implements OnInit, AfterViewInit, MetaInitializer {
  post: any;
  images: Image[];
  galleryConfig: PlainGalleryConfig;
  descriptionConfig: Description;
  @ViewChild('postContent') private postContent: ElementRef;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private metaTagsCreator: MetaTagsCreator,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.post.length > 0) {
      this.post = resolvedData.post[0];
      this.initMetaTags();
    } else {
      this.router.navigate(['error-404']);
    }
    this.galleryConfig = this.getGalleryConfig();
    this.descriptionConfig = this.getDescriptionConfig();
    this.images = [
      new Image(
        0,
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img1.jpg',
          description: 'Description 1'
        },
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img1.jpg'
        }
      ),
      new Image(
        1,
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img2.png',
          description: 'Description 2'
        },
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img2.png'
        }
      ),
      new Image(
        2,
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img1.jpg',
          description: 'Description 3'
        }
      ),
      new Image(
        3,
        {
          img: 'https://raw.githubusercontent.com/Ks89/angular-modal-gallery/v4/examples/systemjs/assets/images/gallery/img2.png',
          description: 'Description 4'
        }
      )
    ];
  }

  ngAfterViewInit() {
    const wysiwygChildren = this.postContent.nativeElement.children;

    Array
      .from(wysiwygChildren)
      .filter((el: HTMLElement) => el.className.includes('gallery') && el.hasAttribute('data-gallery-json'))
      .forEach((el: HTMLElement) => {
        const galleryData = JSON.parse(el.getAttribute('data-gallery-json'));
        let galleryImages = [];

        galleryData.forEach((image, index) => {
          galleryImages.push(new Image(
            index,
            {
              img: image.large,
              description: image.caption
            },
            {
              img: image.thumbnail
            }
          ));
        });
        console.log(galleryImages);
        // @todo create dynamically ks-gallery component and replace it with .gallery div

      });
  }

  getDescriptionConfig() {
    return {
      strategy: DescriptionStrategy.HIDE_IF_EMPTY
    };
  }

  getGalleryConfig(): PlainGalleryConfig {
    return {
      strategy: PlainGalleryStrategy.GRID,
      layout: new GridLayout(
        {
          width: '150px',
          height: '150px'
        },
        {
          length: 3,
          wrap: true
        }
      )
    };
  }

  initMetaTags() {
    if (typeof this.post.yoast_meta !== 'undefined') {
      this.metaTagsCreator.createMetaTags(this.post.yoast_meta);
    }
  }
}
