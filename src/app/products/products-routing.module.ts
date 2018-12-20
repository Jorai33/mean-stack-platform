import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
import { NewProductComponent } from './new-product/new-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AllProductsComponent } from './all-products/all-products.component';

const routes: Routes = [
	{
		path: 'products/all',
		component: AllProductsComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'products/new',
		component: NewProductComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'products/:id',
		component: ViewProductComponent,
		canActivate: [CanActivateRouteGuard]
	}
]

@NgModule({

	imports: [
		RouterModule.forChild(routes)
	],
	
	exports: [
		RouterModule
	]
})

export class ProductsRoutingModule {

}