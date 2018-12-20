import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { CanActivateRouteGuard } from '@app/can-activate-route.guard';

// Components
import { MyAccountComponent } from './my-account/my-account.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
	{
		path: 'my-account',
		component: MyAccountComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'knowledge-base',
		component: KnowledgeBaseComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'support',
		component: ContactSupportComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'terms-of-service',
		component: TermsOfServiceComponent,
		canActivate: [CanActivateRouteGuard]
	},
	{
		path: 'privacy-policy',
		component: PrivacyPolicyComponent,
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

export class AccountsRoutingModule {

}