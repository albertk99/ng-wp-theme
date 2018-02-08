import { Component, OnInit, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser/src/browser/meta';

import { PageTemplateDirective } from './directives/page-template.directive';
import { MetaTagsCreator } from '../shared/meta-tags-creator';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit {
  private page: any;
  @ViewChild(PageTemplateDirective) templateDirective: PageTemplateDirective;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private metaTagsCreator: MetaTagsCreator
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.page.length > 0) {
      this.page = resolvedData.page[0];
      const pageTemplate = this.page.template !== '' ? this.page.template : 'DefaultComponent';

      this.addYoastMeta();
      this.loadTemplate(pageTemplate);
    } else {
      this.router.navigate(['404']);
    }
  }

  addYoastMeta() {
    if (typeof this.page.yoast_meta !== 'undefined') {
      this.metaTagsCreator.initMetaTags(this.page.yoast_meta);
    }
  }

  loadTemplate(templateClassName) {
    const factories = Array.from(this.componentFactoryResolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.className === templateClassName);

    if (factoryClass !== undefined && typeof factoryClass === 'function') {
      const factory = this.componentFactoryResolver.resolveComponentFactory(factoryClass);
      const componentRef = this.templateDirective.viewContainerRef.createComponent(factory);

      componentRef.instance.page = this.page;
    } else {
      console.error('Page template does not exists!');
    }
  }
}
