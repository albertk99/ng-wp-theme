import { Component, Input } from '@angular/core';
import { PageBaseTemplate } from '../page-base-template';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent extends PageBaseTemplate {
  static readonly className = 'DefaultComponent';
  @Input() page: any;

  constructor() {
    super();
  }
}
