import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserThumbnailComponent } from './user-thumbnail/user-thumbnail.component';
import { CommonModule } from '@angular/common';
import { BlocksModule } from '../blocks/blocks.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersComponent } from './filters/filters.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormValidationErrorsDirective } from './directives/form-validation-errors.directive';

@NgModule({
  declarations: [
    DashboardComponent, UserThumbnailComponent, FiltersComponent, UserFormComponent, NotFoundComponent, FormValidationErrorsDirective
  ],
  imports: [MainRoutingModule, CommonModule, BlocksModule, InfiniteScrollModule],
  providers: []
})
export class MainModule { }
