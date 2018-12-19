import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

import { AuthService } from '@app/services/auth/auth.service';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

// import { NewContactDialogComponent } from './dialogs/new-contact-dialog/new-contact-dialog.component';
import { NewItemDialogComponent } from '@app/invoices/dialogs/new-item-dialog/new-item-dialog.component';

import Invoice from '@app/interfaces/invoice.interface';
import InvoiceItem from '@app/interfaces/invoiceItem.interface';

import { DateValidator } from '@app/validators/date.validator';

@Component({
	selector: 'app-new-invoice',
	templateUrl: './new-invoice.component.html',
	styleUrls: ['./new-invoice.component.scss']
})

export class NewInvoiceComponent implements OnInit {

	invoice: Invoice;
	invoiceForm: FormGroup;

	items: InvoiceItem[];
	itemsData = new MatTableDataSource<any>();
	tableColumns = [
		'description',
		'type',
		'unitPrice',
		'quantity',
		'subtotal',
		'tax',
		'total',
		'notes'
	]
	
	subtotal: number;
	tax: number;
	total: number;

	contacts;
	unsubscribe$ = new Subject();

	newItemDialogRef: MatDialogRef<NewItemDialogComponent>;

	constructor(private router: Router, public authService: AuthService, public invoicesService: InvoicesService, public contactsService: ContactsService, private notificationsService: NotificationsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
		this.items = [];
		this.itemsData.data = this.items;

		this.invoiceForm = this.formBuilder.group({
			reference: ['', Validators.required],
			saleDate: [
				'',
				[
					Validators.required,
					DateValidator.validDate
				]
			],
			dueDate: [
				'',
				[
					Validators.required,
					DateValidator.validDate
				]
			],
			contactId: ['', Validators.required],
			notes: [null, Validators.maxLength(200)]
		})

		this.subtotal = 0;
		this.tax = 0;
		this.total = 0;
	}


	// ngOnInit()
	async ngOnInit() {
		try {
			const contacts$ = await this.contactsService.getContacts();

			contacts$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(contacts => {
					this.contacts = contacts;
				})
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving contacts: ${err.message}`, null);
		}
	}


	// get form()
	get form() {
		return this.invoiceForm.controls;
	}


	// addItem()
	addItem() {
		this.newItemDialogRef = this.dialog.open(NewItemDialogComponent, {
			hasBackdrop: true,
			data: {
				items: this.items
			}
		})

		this.newItemDialogRef.afterClosed().subscribe(item => {
			if (item) {
				this.items.push(item);
				this.itemsData.data = this.items;

				this.subtotal += item.subtotal;
				this.tax += item.tax;
				this.total += item.total;
			}
		})
	}


	// deleteItem()
	deleteItem() {
		// TODO:
	}


	// editItem()
	editItem() {
		// TODO:
	}


	// onDateInput(controlName, event)
	onDateInput(controlName, event) {
		this.invoiceForm.controls[controlName].setValue(moment(event.target.value, 'DD/MM/YYYY').toISOString());
	}
	

	// saveInvoice()
	saveInvoice() {
		this.buildInvoice();
		
		if (this.invoice.total < 0) {
			this.notificationsService.createAlert('Invoice total must be £0.00 or greater', 'Close');
			return;
		} else {
			this.invoicesService.saveInvoice(this.invoice).toPromise()
				.then(res => {
					this.notificationsService.createAlert('Invoice saved', null);
					this.router.navigateByUrl('invoices/all');
				})
				.catch(err => {
					this.notificationsService.createAlert(`Error saving invoice: ${err.message}`, 'Close');
				})
		}
	}


	// saveAndSend()
	saveAndSend() {
		this.buildInvoice();
		
		if (this.invoice.total < 0) {
			this.notificationsService.createAlert('Invoice total must be £0.00 or greater', 'Close');
			return;
		} else {
			// TODO:
		}
	}


	// buildInvoice()
	buildInvoice() {
		this.invoice = this.invoiceForm.value;
		this.invoice.items = this.items;
		this.invoice.items.forEach(item => {
			item.quantity = +item.quantity;
			item.unitPrice = +item.unitPrice;
		})
		this.invoice.subtotal = this.subtotal;
		this.invoice.tax = this.tax;
		this.invoice.total = this.total;
		this.invoice.outstanding = this.total;
		this.invoice.userId = this.authService.userId;
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}