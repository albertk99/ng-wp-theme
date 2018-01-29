import { HttpClient, HttpParams } from '@angular/common/http';

declare function require(url: string);
const config = require('../../../config.json');

export class ACFServicesBase {
  constructor(public http: HttpClient) { }

  objToHttpParams(paramsObj) {
    paramsObj.apiBaseUrl = config.acfAPIBaseUrl;

    return Object
      .getOwnPropertyNames(paramsObj)
      .reduce((p, key) => p.set(key, paramsObj[key]), new HttpParams());
  }
}
