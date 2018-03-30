import { Component, Input } from '@angular/core';
import { PageBaseTemplate } from '../page-base-template';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component extends PageBaseTemplate {
  static readonly className = 'Page404Component';
  @Input() page: any;

  constructor() {
    super();
  }
}
