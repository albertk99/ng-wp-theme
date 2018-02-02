import { Component, Input } from '@angular/core';
import { PageTemplate } from '../page-template';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends PageTemplate {
  static readonly className = 'DefaultComponent';
  @Input() page: any;

  constructor() {
    super();
  }
}
