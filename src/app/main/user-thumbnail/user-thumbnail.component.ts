import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../data-models/DatasetGenerator';

@Component({
  selector: 'df-product-thumbnail',
  templateUrl: './user-thumbnail.component.html',
  styleUrls: ['./user-thumbnail.component.scss']
})
export class UserThumbnailComponent implements OnInit {

  @Input() user!: IUser;
  constructor() { }

  ngOnInit(): void {
  }
}
