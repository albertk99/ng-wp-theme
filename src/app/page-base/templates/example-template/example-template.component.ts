import { Component, Input } from '@angular/core';
import { PageTemplate } from '../page-template';

@Component({
  selector: 'app-example-template',
  templateUrl: './example-template.component.html',
  styleUrls: ['./example-template.component.scss']
})
export class ExampleTemplateComponent extends PageTemplate {
  static className = 'ExampleTemplateComponent';
  @Input() page: Response;

  constructor() {
    super();
  }
}
