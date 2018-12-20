import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';

// SHARED/MATERIAL MODULES
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
	import { NewProductComponent } from './new-product/new-product.component';
      import { ViewProductComponent } from './view-product/view-product.component';
      import { AllProductsComponent } from './all-products/all-products.component';

@NgModule({

	imports: [
		CommonModule,
		ProductsRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
			// New Product
			NewProductComponent,
			// View Product
			ViewProductComponent,
			// All Products
			AllProductsComponent
	]
})

export class ProductsModule {

}