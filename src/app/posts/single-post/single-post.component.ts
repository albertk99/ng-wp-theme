import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../../shared/wp-services/posts.service';
import { MetaInitializer } from '../../shared/yoast-seo/meta-initializer.interface';
import { MetaTagsCreator } from '../../shared/yoast-seo/meta-tags-creator';
import {
  Image,
  PlainGalleryConfig,
  PlainGalleryStrategy,
  LineLayout,
  DescriptionStrategy,
  Description,
  GridLayout,
  ɵc as ModalGalleryComponent } from 'angular-modal-gallery';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService]
})

export class SinglePostComponent implements OnInit, AfterViewInit, MetaInitializer {
  post: any;
  private galleryFactory;
  @ViewChild('postContent') private postContent: ElementRef;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private metaTagsCreator: MetaTagsCreator,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private app: ApplicationRef
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.post.length > 0) {
      this.post = resolvedData.post[0];
      this.initMetaTags();
    } else {
      this.router.navigate(['error-404']);
    }
    this.galleryFactory = this.componentFactoryResolver.resolveComponentFactory(ModalGalleryComponent);
  }

  ngAfterViewInit() {
    const wysiwygChildren = this.postContent.nativeElement.children;

    Array
      .from(wysiwygChildren)
      .filter((el: HTMLElement) => el.className.includes('gallery') && el.hasAttribute('data-gallery-json'))
      .forEach((el: HTMLElement) => {
        this.createDynamicGalleryComponent(el);
      });
  }

  public initMetaTags() {
    if (typeof this.post.yoast_meta !== 'undefined') {
      this.metaTagsCreator.createMetaTags(this.post.yoast_meta);
    }
  }

  private createDynamicGalleryComponent(element: HTMLElement) {
    setTimeout(() => {
      const galleryData = JSON.parse(element.getAttribute('data-gallery-json'));
      const ref = this.galleryFactory.create(this.injector, [], element);
      ref.instance.modalImages = this.getImagesGalleryInput(galleryData);
      ref.instance.plainGalleryConfig = this.getGalleryConfig();
      ref.instance.description = this.getDescriptionConfig();
      ref.instance.previewConfig = { visible: true };
      ref.instance.dotsConfig = { visible: false };
      ref.instance.slideConfig = { infinite: false, sidePreviews: { show: false } };
      this.app.attachView(ref.hostView);
    }, 1);
  }

  private getImagesGalleryInput(galleryData): Image[] {
    const galleryImages = [];

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

    return galleryImages;
  }

  private getDescriptionConfig(): Description {
    return {
      strategy: DescriptionStrategy.HIDE_IF_EMPTY
    };
  }

  private getGalleryConfig(): PlainGalleryConfig {
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
}
