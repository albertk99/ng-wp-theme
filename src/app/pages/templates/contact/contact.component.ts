import { Component, Input } from '@angular/core';
import { PageBaseTemplate } from '../page-base-template';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends PageBaseTemplate {
  static readonly className = 'ContactComponent';
  @Input() page: any;

  constructor() {
    super();
  }
}
