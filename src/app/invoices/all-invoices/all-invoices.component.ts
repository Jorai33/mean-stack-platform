import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as moment from 'moment';

import Invoice from '../invoice.interface';
import { DataService } from '../../services/data/data.service';

@Component({
	selector: 'app-all-invoices',
	templateUrl: './all-invoices.component.html',
	styleUrls: ['./all-invoices.component.scss']
})

export class AllInvoicesComponent implements OnInit {

	invoices;
	total: Number = 0;
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dataSource = new MatTableDataSource<any>();
	tableColumns = [
		'id',
		'number',
		'reference',
		'date',
		'total',
		'status'
	]

	constructor(private database: DataService) {

	}

	ngOnInit() {
		this.buildTable();
	}
	
	ngAfterViewInit() {
	}

	async buildTable() {
		try {
			this.invoices = await this.database.getItems('invoices');
			this.dataSource.data = this.invoices;
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
			this.calculateTotal();
		} catch(err) {
			console.error(`Error retrieving invoices: ${err.Message}`);
		}
	}

	calculateTotal() {
		this.invoices.forEach(invoice => {
			if (moment(invoice.date).isAfter(moment().subtract(365, 'days'))) {
				this.total += invoice.total;
			}
		})
	}

}
