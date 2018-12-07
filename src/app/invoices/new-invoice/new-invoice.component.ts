import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';

import { DataService } from '@app/services/data/data.service';
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

	newItemDialogRef: MatDialogRef<NewItemDialogComponent>;
	
	subtotal: number;
	tax: number;
	total: number;

	constructor(private router: Router, public data: DataService, public invoicesService: InvoicesService, public contactsService: ContactsService, private notificationsService: NotificationsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
		this.items = [];
		this.itemsData.data = this.items;

		this.invoiceForm = this.formBuilder.group({
			id: ['', Validators.required],
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

	ngOnInit() {

	}

	ngAfterViewInit() {
		
	}

	get form() {
		return this.invoiceForm.controls;
	}

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

	deleteItem() {
		// TODO:
	}

	editItem() {
		// TODO:
	}

	onDateInput(controlName, event) {
		this.invoiceForm.controls[controlName].setValue(moment(event.target.value, 'DD/MM/YYYY').toISOString());
	}
	
	saveInvoice() {
		this.buildInvoice();
		
		if (this.invoice.total < 0) {
			this.notificationsService.createAlert('Invoice total must be £0.00 or greater', 'Close');
			return;
		} else {
			// this.data.putItem('invoices', this.invoice)
			// 	.then(res => {
			// 		this.router.navigateByUrl('invoices/all');
			// 		this.notificationsService.createAlert('Invoice saved', null);
			// 	})
			// 	.catch(err => {
			// 		this.notificationsService.createAlert(`Error saving invoice: ${err.message}`, 'Close');
			// 	})
		}
	}

	saveAndSend() {
		this.buildInvoice();
		
		if (this.invoice.total < 0) {
			this.notificationsService.createAlert('Invoice total must be £0.00 or greater', 'Close');
			return;
		} else {
			// this.data.putItem('invoices', this.invoice)
			// 	.then(res => {
			// 		this.notificationsService.createAlert('Invoice saved', null);

			// 		this.invoicesService.sendToContact(this.invoice.contactId)
			// 			.then(_ => {
			// 				this.notificationsService.createAlert('Invoice sent to client', null);
			// 				this.router.navigateByUrl('invoices/all');
			// 			})
			// 			.catch(err => {
			// 				console.error(`Error sending email to contact: ${err.message}`, 'Close');
			// 			})
			// 	})
			// 	.catch(err => {
			// 		this.notificationsService.createAlert(`Error saving invoice: ${err.message}`, 'Close');
			// 	})
		}
	}

	buildInvoice() {
		this.invoice = this.invoiceForm.value;
		this.invoice.items = this.items;
		this.invoice.subtotal = this.subtotal;
		this.invoice.tax = this.tax;
		this.invoice.total = this.total;
		this.invoice.outstanding = this.total;
	}

}