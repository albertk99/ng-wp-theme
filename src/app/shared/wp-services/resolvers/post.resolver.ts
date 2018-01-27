import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PostsService } from '../posts.service';

@Injectable()
export class PostResolver implements Resolve<Response> {
  private postsService: PostsService;

  constructor(private http: HttpClient) {
    this.postsService = new PostsService(http);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Response> {
    const optionalParams = {
      _embed: ''
    };

    return this.postsService.getBySlug(route.paramMap.get('slug'), optionalParams);
  }
}
