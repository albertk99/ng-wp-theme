import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { PostsService } from '../../wp-services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostsService]
})

export class PostListComponent implements OnInit {
  posts: Response;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const params = {
      _embed: '',
      per_page: 5
    };

    this.postsService
      .getList(params)
      .subscribe((posts: Response) => {
        this.posts = posts;
      });
  }
}
