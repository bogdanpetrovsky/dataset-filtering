import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilterForm, PRODUCT_TYPE, SORT_TYPE } from '../../../data-models/FilteringHelpers';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'df-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  typeFilters: PRODUCT_TYPE[] = ['Any', 'Electronic', 'Hardware', 'Household'];
  sortTypes: SORT_TYPE[] = ['Default', 'Highest Price', 'Lowest Price'];
  filtersForm = new FormGroup({
    search: new FormControl('', []),
    minPrice: new FormControl(0, [Validators.min(0)]),
    maxPrice: new FormControl(100, [Validators.max(100)]),
    type: new FormControl('Any', []),
    sort: new FormControl('Default', []),
  })
  formSubscription: Subscription;
  minPrice = 0;
  maxPrice = 100;

  @Output() filtersUpdated = new EventEmitter<IFilterForm>();
  constructor() { }

  ngOnInit(): void {
    this.filtersForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.emitFilterUpdate();
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  sliderChanged(slider: 'minPrice' | 'maxPrice', $event: number) {
    if (slider === 'minPrice' && $event > this.filtersForm.controls.maxPrice.value) {
      this.maxPrice = $event;
      this.filtersForm.controls['maxPrice'].patchValue($event);
    }
    if (slider === 'maxPrice' && $event <= this.filtersForm.controls.minPrice.value) {
      this.minPrice = $event;
      this.filtersForm.controls['minPrice'].patchValue($event);
    }

    this.filtersForm.controls[slider].patchValue($event);
  }

  emitFilterUpdate() {
    this.filtersUpdated.emit(this.filtersForm.value);
  }
}
