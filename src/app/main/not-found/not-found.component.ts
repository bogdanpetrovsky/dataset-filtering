import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'df-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  pageTitle: string = '404';
  pageDescription: string = 'Page not found';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      if (url[0].path === '403') {
        this.pageTitle = '403';
        this.pageDescription = 'Access Denied';
      }
    })
  }

}
