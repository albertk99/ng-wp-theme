import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PostsService } from '../../shared/wp-services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService]
})

export class SinglePostComponent implements OnInit {
  post: Response;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostBySlug('path');
  }

  getPostBySlug(slug) {
    const optionalParams = {
      _embed: ''
    };
    this.route.paramMap
      .switchMap((params: ParamMap) => this.postsService.getBySlug(params.get('slug'), optionalParams))
      .subscribe((post: Response) => this.post = post[0]);
  }
}
