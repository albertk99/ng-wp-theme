import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

import { WPServicesBase } from './wp-services-base';
import { IPosts } from './interfaces/IPosts.interface';

@Injectable()
export class PostsService extends WPServicesBase implements IPosts {
  constructor(http: HttpClient) {
    super(http);
  }

  getList(params: Object = {}): Observable<Response> {
    return this.http.get<Response>('posts', { params: super.objToHttpParams(params) });
  }

  getBySlug(slug: String, params: Object = {}): Observable<Response> {
    return this.http.get<Response>(`posts?slug=${slug}`, { params: super.objToHttpParams(params) });
  }
}
