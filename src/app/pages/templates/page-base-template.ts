import { Input } from '@angular/core';

export class PageBaseTemplate {
  static readonly className: string; // this property is unfortunately required
                                     // because loading templates by component class name is not supported with minification...
  @Input() page: any;
}
