import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { CommonModule } from '@angular/common';
import { BlocksModule } from '../blocks/blocks.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    DashboardComponent, ProductThumbnailComponent, FiltersComponent
  ],
  imports: [MainRoutingModule, CommonModule, BlocksModule, InfiniteScrollModule],
  providers: []
})
export class MainModule { }
