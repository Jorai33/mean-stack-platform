import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '@app/services/auth/auth.service';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

import Contact from '@app/interfaces/contact.interface';

@Component({
	selector: 'app-new-contact',
	templateUrl: './new-contact.component.html',
	styleUrls: ['./new-contact.component.scss']
})

export class NewContactComponent implements OnInit {

	contactForm: FormGroup;

	constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private contactsService: ContactsService, private notificationsService: NotificationsService) {
		this.contactForm = this.formBuilder.group({
			reference: ['', Validators.required],
			// TODO:
		})
	}

	ngOnInit() {

	}

	saveContact() {
		// TODO:
	}

}