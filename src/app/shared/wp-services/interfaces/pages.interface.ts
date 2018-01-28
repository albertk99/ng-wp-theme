import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

export interface Pages {
  getBySlug(slug: String, params: Object): Observable<Response>;
}
