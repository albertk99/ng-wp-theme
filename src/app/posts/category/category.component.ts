import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../shared/wp-services/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const resolvedData = this.route.snapshot.data;

    if (resolvedData.category.length > 0) {
      this.category = resolvedData.category[0];
    } else {
      this.router.navigate(['error-404']);
    }
  }
}
