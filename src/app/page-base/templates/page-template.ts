import { Input } from '@angular/core';

export class PageTemplate {
  static readonly className: string;
  @Input() page: Response;
}
