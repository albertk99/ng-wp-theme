
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

declare function require(url: string);
const config = require('../../../config.json');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = config.wpAPIRoot;

    req = req.clone({
      url: url + req.url
    });

    return next.handle(req);
  }
}
