import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

import { WPServicesBase } from './wp-services-base';
import { IPages } from './interfaces/IPages.interface';

@Injectable()
export class PagesService extends WPServicesBase implements IPages {
  constructor(http: HttpClient) {
    super(http);
  }

  getBySlug(slug: String, params: Object = {}): Observable<Response> {
    return this.http.get<Response>(`pages?slug=${slug}`, { params: super.objToHttpParams(params) });
  }
}
