import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';

import * as moment from 'moment';

import { NewItemDialogComponent } from '@app/invoices/dialogs/new-item-dialog/new-item-dialog.component';

import Invoice from '@app/interfaces/invoice.interface';
import { NotificationsService } from '@app/services/notifications/notifications.service';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { InvoicesService } from '@app/services/invoices/invoices.service';

import { DateValidator } from '@app/validators/date.validator';

@Component({
	selector: 'app-view-invoice',
	templateUrl: './view-invoice.component.html',
	styleUrls: ['./view-invoice.component.scss']
})

export class ViewInvoiceComponent implements OnInit {

	invoice: Invoice;
	invoiceForm;
	
	subtotal: number;
	tax: number;
	total: number;

	contacts;
	unsubscribe$ = new Subject();

	@ViewChild(MatSort) sort: MatSort;
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

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private contactsService: ContactsService, private invoicesService: InvoicesService, private notificationsService: NotificationsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
		this.invoiceForm = this.formBuilder.group({
			_id: [null, Validators.required],
			reference: [null, Validators.required],
			saleDate: [
				null,
				[
					Validators.required,
					DateValidator.validDate
				]
			],
			dueDate: [
				null,
				[
					Validators.required,
					DateValidator.validDate
				]
			],
			contactId: [null, Validators.required],
			notes: [null, Validators.maxLength(200)]
		})
	}


	// ngOnInit()
	async ngOnInit() {
		let invoiceId;

		this.activatedRoute.params.subscribe(param => {
			invoiceId = param.id;
		})

		this.getInvoice(invoiceId);
		this.getContacts();
	}


	// getInvoice()
	async getInvoice(invoiceId) {
		try {
			const invoice$ = await this.invoicesService.getInvoice(invoiceId);

			invoice$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(invoice => {
					this.invoice = invoice;
					this.invoiceForm.patchValue(invoice);
					this.itemsData.data = this.invoice.items;
					this.itemsData.sort = this.sort;
				})
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving invoice: ${err.message}`, 'Close');
		}
	}


	// getContacts()
	async getContacts() {
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


	// updateContact()
	updateContact() {
		console.log('ViewInvoice.updateContact()');
	}


	// addItem()
	addItem() {
		this.newItemDialogRef = this.dialog.open(NewItemDialogComponent, {
			hasBackdrop: true,
			data: {
				items: this.invoice.items
			}
		})

		this.newItemDialogRef.afterClosed().subscribe(item => {
			if (item) {
				this.invoice.items.push(item);
				this.itemsData.data = this.invoice.items;

				this.invoice.subtotal += item.subtotal;
				this.invoice.tax += item.tax;
				this.invoice.total += item.total;
			}
		})
	}


	// onDateInput(controlName, event)
	onDateInput(controlName, event) {
		this.invoiceForm.controls[controlName].setValue(moment(event.target.value, 'DD/MM/YYYY').toISOString());
	}


	// saveInvoice()
	saveInvoice() {
		Object.assign(this.invoice, this.invoiceForm.value);
		
		if (this.invoice.total < 0) {
			this.notificationsService.createAlert('Invoice total must be £0.00 or greater', 'Close');
			return;
		} else {
			this.invoicesService.updateInvoice(this.invoice).toPromise()
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
		// TODO:
		console.log('ViewInvoice.saveAndSend()');
	}


	// ngOnDestroy()
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}