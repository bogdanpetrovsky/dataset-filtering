import { Injectable } from '@angular/core';
import { DATASET_MOCK } from '../../../data-models/mocks/DATASET_MOCK';
import { IProduct } from '../../../data-models/DatasetGenerator';
import { FilteringHelper, IPaginatedResult, IValidatedFilters } from '../../../data-models/FilteringHelpers';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productDataset = JSON.parse(JSON.stringify(DATASET_MOCK, null, 2));
  constructor() {}

  getProducts(validatedFilters: IValidatedFilters): IPaginatedResult<IProduct> {
    return FilteringHelper.filterProducts(this.productDataset, validatedFilters);
  }
}
