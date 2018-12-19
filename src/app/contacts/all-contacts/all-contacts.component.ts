import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import Contact from '@app/interfaces/contact.interface';
import { ContactsService } from '@app/services/contacts/contacts.service';
import { NotificationsService } from '@app/services/notifications/notifications.service';

@Component({
	selector: 'app-all-contacts',
	templateUrl: './all-contacts.component.html',
	styleUrls: ['./all-contacts.component.scss']
})

export class AllContactsComponent implements OnInit {
	
	loadComplete: boolean;
	unsubscribe$ = new Subject();
	total: number = 0;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	tableData = new MatTableDataSource<any>();
	tableColumns = [
		'reference',
		'email',
		'telephone',
		'vatNumber'
	]

	constructor(public contactsService: ContactsService, private notificationsService: NotificationsService, private router: Router) {

	}


	// ngOnInit()
	ngOnInit() {
		this.buildTable();
	}


	// buildTable()
	async buildTable() {
		try {
			const contacts$ = await this.contactsService.getContacts();

			contacts$
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe((contacts: Contact[]) => {
					this.tableData.data = contacts;
				})

			this.tableData.paginator = this.paginator;
			this.tableData.sort = this.sort;
		} catch(err) {
			this.notificationsService.createAlert(`Error retrieving contacts: ${err.message}`, null);
		}
	}


	// viewContact(contact)
	viewContact(contact) {
		this.router.navigateByUrl(`contacts/${contact._id}`)
	}


	// getContactTelephone(contact)
	getContactTelephone(contact) {
		if (contact.telephoneSecondary.length) {
			return `${contact.telephonePrimary} / ${contact.telephoneSecondary}`;
		} else {
			return contact.telephonePrimary;
		}
	}


	// ngOnDestroy()
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

}