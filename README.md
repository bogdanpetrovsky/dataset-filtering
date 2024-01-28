# DatasetFiltering

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Documentation

I decided to separate data handling to the service, so that it can be easily reused in other components.
But the main filtering logic lies within a helper class `DatasetFilteringHelper` which is used by the service. Thats because I wanted to keep the service as simple as possible.

I also used a reactive approach, so that the data is updated automatically when the user changes the filter.
I subscribed to the form `valueChanges` observable to get the latest filter values only in one place.
I also used the `debounceTime` and `distinctUntilChanged` operator to avoid unnecessary calls to the "API".

To improve performance, and avoid unnecessary re-rendering of all thumbnails, I used the `trackBy` function in the `ngFor` directive.

To create user-friendly UI, I used Angular Material: `mat-slider` component for the range filter, `mat-form-field` and `mat-select` for other filters.
