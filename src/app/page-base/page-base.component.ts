import { Component, OnInit, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from '@angular/router';

import { PageTemplateDirective } from './directives/page-template.directive';
import { ExampleTemplateComponent } from './templates/example-template/example-template.component';

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss']
})
export class PageBaseComponent implements OnInit {
  private static acfTemplateSelectorFieldName = 'template';
  private page: Response;
  private acf: Response;
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
      const pageTemplate = 'ExampleTemplateComponent'; // @todo page template should be received from api
                                                       // (query using acf and acfTemplateSelectorFieldName field)

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
