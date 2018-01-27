import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/wp-services/posts.service';
@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss'],
  providers: [PostsService]
})
export class PageBaseComponent implements OnInit {
  page: Response;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.page.length > 0) {
      this.page = resolvedData.page[0];
    } else {
      this.router.navigate(['404']);
    }
  }
}
