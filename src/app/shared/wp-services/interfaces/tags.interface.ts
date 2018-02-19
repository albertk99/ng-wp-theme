import { Observable } from 'rxjs/Observable';

export interface Tags {
  getBySlug(slug: String, params: Object): Observable<any>;
}
