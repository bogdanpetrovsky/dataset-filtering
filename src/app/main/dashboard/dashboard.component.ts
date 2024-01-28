import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../data-models/DatasetGenerator';
import { ProductService } from '../services/product.service';
import {
  FilteringHelper,
  IFilterForm,
  IValidatedFilters
} from '../../../data-models/FilteringHelpers';

@Component({
  selector: 'df-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appliedFilters: IValidatedFilters = {
    sort: {
      sortBy: 'id',
      sortDirection: 'asc'
    },
    filters: {
      search: '',
      filterMap: {}
    },
    pagination: {
      page: 1,
      size: 20
    }
  };
  products: IProduct[];
  total: number;
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.getProducts();
  }

  idTrackBy(index, product: IProduct) {
    return product.id;
  }

  getProducts() {
    const { products, total } = this.productService.getProducts(this.appliedFilters);
    this.products = products;
    this.total = total;
  }

  getMoreProducts() {
    const newProducts = this.productService.getProducts(this.appliedFilters).products;
    this.products = [...this.products, ...newProducts];
  }

  onScroll() {
    this.appliedFilters.pagination.page++;
    this.getMoreProducts();
  }

  getFilteredProducts($event: IFilterForm) {
    this.appliedFilters = FilteringHelper.getAppliedFilters($event, { page: 1, size: 20 });
    const { products, total } = this.productService.getProducts(this.appliedFilters);
    this.products = products;
    this.total = total;
  }
}
