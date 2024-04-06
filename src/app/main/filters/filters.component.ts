import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'df-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
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
  constructor() { }

  ngOnInit(): void {
    this.filtersForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
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
}
