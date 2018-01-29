import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../../shared/wp-services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  providers: [PostsService]
})

export class SinglePostComponent implements OnInit {
  post: Response;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.post.length > 0) {
      this.post = resolvedData.post[0];
    } else {
      this.router.navigate(['404']);
    }
  }
}
