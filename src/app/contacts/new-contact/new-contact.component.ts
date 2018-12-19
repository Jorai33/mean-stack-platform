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

	contact: Contact;
	contactForm: FormGroup;

	countries;
	selectedCountry: 'United Kingdom of Great Britain and Northern Ireland';

	constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private contactsService: ContactsService, private notificationsService: NotificationsService) {
		// TODO: Validation
		this.contactForm = this.formBuilder.group({
			reference: ['', Validators.required],
			email: ['', Validators.required],
			telephonePrimary: '',
			telephoneSecondary: '',
			address: this.formBuilder.group({
				line1: '',
				line2: '',
				townCity: '',
				countyState: '',
				postcode: '',
				country: 'United Kingdom of Great Britain and Northern Ireland'
			}),
			vatNumber: ''
		})
	}

	async ngOnInit() {
		try {
			const getCountries = await fetch('https://restcountries.eu/rest/v2/all');
			this.countries = await getCountries.json();
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving countries list: ${err.message}`, 'Close');
		}
	}

	get form() {
		return this.contactForm.controls;
	}

	saveContact() {
		this.contact = this.contactForm.value;
		this.contact.userId = this.authService.userId;
		this.contactsService.saveContact(this.contact).toPromise()
			.then(res => {
				this.notificationsService.createAlert('Contact saved', null);
				this.router.navigateByUrl('contacts/all');
			})
			.catch(err => {
				this.notificationsService.createAlert(`Error saving contact: ${err.message}`, 'Close');
			})
	}

}