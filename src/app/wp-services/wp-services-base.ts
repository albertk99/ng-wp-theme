import { HttpClient, HttpParams } from '@angular/common/http';

export class WPServicesBase {
  constructor(public http: HttpClient) { }

  objToHttpParams(paramsObj) {
    return Object
      .getOwnPropertyNames(paramsObj)
      .reduce((p, key) => p.set(key, paramsObj[key]), new HttpParams());
  }
}
