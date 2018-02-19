import { Observable } from 'rxjs/Observable';

export interface Posts {
  getList(params: Object): Observable<any>;
  getBySlug(slug: String, params: Object): Observable<any>;
}
