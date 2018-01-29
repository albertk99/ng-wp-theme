import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';

import { ACFServicesBase } from './acf-services-base';

@Injectable()
export class PagesService extends ACFServicesBase {
  constructor(http: HttpClient) {
    super(http);
  }

  getByID(id: Number, params: Object = {}): Observable<Response> {
    return this.http.get<Response>(`pages/${id}`, { params: super.objToHttpParams(params) });
  }
}
