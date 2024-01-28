import { IProduct } from './DatasetGenerator';

export type PRODUCT_TYPE = 'Any' | 'Electronic' | 'Household' | 'Hardware';
export type SORT_TYPE = 'Default' | 'Highest Price' | 'Lowest Price';
export interface IPaginatedResult<T> {
  products: T[];
  total: number;
}

export interface ISort {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

export interface IPagination {
  page: number;
  size?: number;
}

export interface ISearch {
  search: string;
  filterMap?: IFilterDictionary;
}

export interface IFilterDictionary {
  [key: string]: string;
}

export interface IFilterForm {
  search: string;
  sort: SORT_TYPE;
  type: PRODUCT_TYPE;
  minPrice: number;
  maxPrice: number;
}

export interface IValidatedFilters {
  sort: ISort;
  filters: ISearch;
  pagination: IPagination;
}

export class FilteringHelper {
  static getAppliedFilters(filterForm: IFilterForm, pageInfo: IPagination): IValidatedFilters {
    const filters: IValidatedFilters = {
      sort: {
        sortBy: 'id',
        sortDirection: 'asc'
      },
      filters: {
        search: "",
      },
      pagination: pageInfo
    };

    if (filterForm.sort && filterForm.sort === 'Highest Price') {
      filters.sort.sortBy = 'price';
      filters.sort.sortDirection = 'desc';
    }
    if (filterForm.sort && filterForm.sort === 'Lowest Price') {
      filters.sort.sortBy = 'price';
      filters.sort.sortDirection = 'asc';
    }
    if (filterForm.search) {
      filters.filters.search = filterForm.search;
    }
    if (filterForm.type) {
      filters.filters.filterMap = {
        type: filterForm.type
      };
    }
    if (filterForm.minPrice || filterForm.minPrice === 0) {
      filters.filters.filterMap = {
        ...filters.filters.filterMap,
        minPrice: filterForm.minPrice.toString()
      };
    }
    if (filterForm.maxPrice || filterForm.maxPrice === 0) {
      filters.filters.filterMap = {
        ...filters.filters.filterMap,
        maxPrice: filterForm.maxPrice.toString()
      };
    }

    return filters;
  }

  static filterProducts (productDataset: IProduct[], validatedFilters: IValidatedFilters): IPaginatedResult<IProduct> {
    console.log('validatedFilters', validatedFilters)
    const { sortBy, sortDirection } = validatedFilters.sort || { sortBy: 'id', sortDirection: 'asc' }
    const { search, filterMap } = validatedFilters.filters || { search: '' };
    const { page, size } = validatedFilters.pagination || { page: 1, size: 20 };
    const start = (page - 1) * size;
    const end = start + size;

    const products = productDataset.filter((product) => {
      for(const key in filterMap) {
        if (key == 'minPrice' && parseInt(product.price) >= parseInt(filterMap[key])) { continue; }
        if (key == 'maxPrice' && parseInt(product.price) <= parseInt(filterMap[key])) { continue; }
        if (key == 'type' && filterMap[key] === 'Any') { continue; }

        if (product[key] !== filterMap[key]) {
          return false;
        }
      }
      return product.name.toLowerCase().includes(search.toLowerCase());
    });

    const sortedProducts = products.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === 'asc' ? -1 : 1;
      }

      return 0;
    });

    return {
      products: sortedProducts.slice(start, end),
      total: products.length
    };
  }
}
