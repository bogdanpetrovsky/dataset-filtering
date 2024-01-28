import { NgModule } from '@angular/core';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    CustomIconComponent
  ],
  imports: [],
  exports: [
    CustomIconComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule,
  ],
  providers: []
})
export class BlocksModule { }
