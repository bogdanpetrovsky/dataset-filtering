import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../data-models/DatasetGenerator';

@Component({
  selector: 'df-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {

  @Input() product!: IProduct;
  constructor() { }

  ngOnInit(): void {
  }
}
