import { Component, Input } from '@angular/core';
import { PageTemplate } from '../page-template';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component extends PageTemplate {
  static readonly className = 'Page404Component';
  @Input() page: any;

  constructor() {
    super();
  }
}