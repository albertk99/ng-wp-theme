import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PagesService } from '../pages.service';

@Injectable()
export class PageResolver implements Resolve<Response> {
  private pagesService: PagesService;

  constructor(private http: HttpClient) {
    this.pagesService = new PagesService(http);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Response> {
    return this.pagesService.getBySlug(route.paramMap.get('slug'));
  }
}
