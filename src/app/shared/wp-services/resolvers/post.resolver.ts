import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service';

@Injectable()
export class PostResolver implements Resolve<any> {
  constructor(private postsService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const optionalParams = {
      _embed: ''
    };

    return this.postsService.getBySlug(route.paramMap.get('slug'), optionalParams);
  }
}
