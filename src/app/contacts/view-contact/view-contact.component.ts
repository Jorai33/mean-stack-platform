import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

import Contact from '@app/interfaces/contact.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';

@Component({
	selector: 'app-view-contact',
	templateUrl: './view-contact.component.html',
	styleUrls: ['./view-contact.component.scss']
})

export class ViewContactComponent implements OnInit {

	contact: Contact;
	contactForm;

	invoices;

	countries;

	unsubscribe$ = new Subject();

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	invoicesData = new MatTableDataSource<any>();
	tableColumns = [
		'reference',
		'saleDate',
		'dueDate',
		'subtotal',
		'tax',
		'total',
		'status'
	]

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private contactsService: ContactsService, private invoicesService: InvoicesService, private notificationsService: NotificationsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
		this.contactForm = this.formBuilder.group({
			_id: [null, Validators.required],
			reference: [null, Validators.required],
			email: [null, Validators.required],
			telephonePrimary: null,
			telephoneSecondary: null,
			address: this.formBuilder.group({
				line1: null,
				line2: null,
				townCity: null,
				countyState: null,
				postcode: null,
				country: null
			}),
			vatNumber: null
		})
	}


	// ngOnInit()
	ngOnInit() {
		let contactId;

		this.activatedRoute.params.subscribe(param => {
			contactId = param.id;
		})

		this.getContact(contactId);
		this.getInvoices(contactId);
		this.getCountries();
	}


	// getContact(contactId)
	async getContact(contactId) {
		try {
			const contact$ = await this.contactsService.getContact(contactId);

			contact$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(contact => {
					this.contact = contact;
					this.contactForm.patchValue(contact);
				})
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving contact: ${err.message}`, 'Close');
		}
	}


	// getInvoices(contactId)
	async getInvoices(contactId) {
		try {
			const invoices$ = await this.invoicesService.getInvoicesForContact(contactId);

			invoices$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(invoices => {
					this.invoices = invoices;
					this.invoicesData.data = invoices;
				})

			this.invoicesData.paginator = this.paginator;
			this.invoicesData.sort = this.sort;
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving invoices for contact: ${err.message}`, 'Close');
		}
	}


	// viewInvoice(invoice)
	viewInvoice(invoice) {
		this.router.navigateByUrl(`invoices/${invoice._id}`)
	}


	// getInvoiceStatus(invoice)
	getInvoiceStatus(invoice) {
		if (invoice.outstanding == 0) {
			return 'paid';
		} else if (moment(invoice.dueDate).isAfter(moment())) {
			return 'open';
		} else {
			return 'overdue';
		}
	}


	// getInvoicesTotal()
	getInvoicesTotal() {
		let total = 0;

		this.invoices.forEach(invoice => {
			total += invoice.total;	
		})

		return total;
	}


	// getCountries()
	async getCountries() {
		try {
			const getCountries = await fetch('https://restcountries.eu/rest/v2/all');
			this.countries = await getCountries.json();
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving countries list: ${err.message}`, 'Close');
		}
	}


	// get form()
	get form() {
		return this.contactForm.controls;
	}


	// saveContact()
	saveContact() {
		Object.assign(this.contact, this.contactForm.value);

		this.contactsService.updateContact(this.contact).toPromise()
			.then(res => {
				this.notificationsService.createAlert('Contact updated', null);
			})
			.catch(err => {
				this.notificationsService.createAlert(`Error updating contact: ${err.message}`, 'Close');
			})
	}


	// ngOnDestroy()
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}