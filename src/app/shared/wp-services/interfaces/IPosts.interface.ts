import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

export interface IPosts {
  getList(params: Object): Observable<Response>;
  getBySlug(slug: String, params: Object): Observable<Response>;
}
