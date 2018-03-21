import { Component, Input } from '@angular/core';
import { PageTemplate } from '../page-template';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends PageTemplate {
  static readonly className = 'ContactComponent';
  @Input() page: any;

  constructor() {
    super();
  }
}
