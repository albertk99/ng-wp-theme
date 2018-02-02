import { Component, OnInit, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageTemplateDirective } from './directives/page-template.directive';

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
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.page.length > 0) {
      this.page = resolvedData.page[0];
      const pageTemplate = resolvedData.page[0].template ? resolvedData.page[0].template : 'DefaultComponent';

      this.loadTemplate(pageTemplate);
    } else {
      this.router.navigate(['404']);
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
