import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductChoiceComponent } from './actions/product-choice/product-choice.component';


@NgModule({
  declarations: [ProductsComponent, ProductChoiceComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [ProductChoiceComponent]
})
export class ProductsModule { }
