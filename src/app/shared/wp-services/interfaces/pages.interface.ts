import { Observable } from 'rxjs/Observable';

export interface Pages {
  getBySlug(slug: String, params: Object): Observable<any>;
}
