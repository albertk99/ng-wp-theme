import { Observable } from 'rxjs/Observable';

export interface Categories {
  getById(id: Number, params: Object): Observable<any>;
  getBySlug(slug: String, params: Object): Observable<any>;
}
