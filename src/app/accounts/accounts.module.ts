import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';

// SHARED/MATERIAL MODULES
import { SharedModule } from '@app/shared.module';
import { MaterialModule } from '@app/material.module';

// Components
import { MyAccountComponent } from './my-account/my-account.component';
import { KnowledgeBaseComponent } from './knowledge-base/knowledge-base.component';
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
	
	imports: [
		CommonModule,
		AccountsRoutingModule,
		SharedModule,
		MaterialModule
	],

	declarations: [
		// Components
		MyAccountComponent,
		KnowledgeBaseComponent,
		ContactSupportComponent,
		TermsOfServiceComponent,
		PrivacyPolicyComponent
	]
})

export class AccountsModule {

}