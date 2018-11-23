import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';

import { DataService } from '@app/services/data/data.service';
import { ContactsService } from '@app/services/contacts/contacts.service';

// import { NewContactDialogComponent } from './dialogs/new-contact-dialog/new-contact-dialog.component';
import { NewItemDialogComponent } from '@app/invoices/dialogs/new-item-dialog/new-item-dialog.component';

import Invoice from '@app/interfaces/invoice.interface';
import InvoiceItem from '@app/interfaces/invoiceItem.interface';

import ValidateDate from '@app/validators/date.validator';

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
	
	subtotal: Number;
	tax: Number;
	total: Number;

	constructor(public data: DataService, public contactsService: ContactsService, private formBuilder: FormBuilder, private dialog: MatDialog) {
		this.items = [];
		this.itemsData.data = this.items;

		this.invoiceForm = this.formBuilder.group({
			id: ['', Validators.required],
			reference: ['', Validators.required],
			contactId: ['', Validators.required],
			date: [
				'',
				[
					Validators.required,
					ValidateDate
				]
			],
			saleDate: [
				'',
				Validators.required,
				ValidateDate
			],
			dueDate: [
				'',
				Validators.required,
				ValidateDate
			]
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
				console.log('Item added:', item);
				this.items.push(item);
				// TODO: Use observable itemsData
				this.itemsData.data = this.items;

				this.subtotal += item.subtotal;
				this.tax += item.tax;
				this.total += item.total;
			}
		})
	}

	deleteItem() {
		// onDateInput()
	}

	editItem() {
		// onDateInput()
	}

	onDateKeyup(controlName, $event) {
		this.invoiceForm.controls[controlName].setValue(moment($event.target.value).toISOString());
		console.log(`invoiceForm.controls.${controlName}.value:`, this.invoiceForm.controls[controlName].value);
	}

}