import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { InvoicesService } from '../services/invoices.service';

export interface InvoicesModel {
  summary: String;
  product: String;
  date_created: Date;
  date_modified: Date;
}

let invoicesData: InvoicesModel[] = [];

@Component({
  selector: 'app-invoices-view',
  templateUrl: './invoices-view.component.html',
  styleUrls: ['./invoices-view.component.css']
})
export class InvoicesViewComponent implements OnInit {
  displayedColumns: string[] = ['summary', 'product.name', 'date_created', 'date_modified'];
  dataSource = new MatTableDataSource<InvoicesModel>(invoicesData);
  selection = new SelectionModel<InvoicesModel>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
   }

  constructor(private invoicesService: InvoicesService ) { }

  ngOnInit() {
    this.invoicesService.getInvoices()
    .subscribe(invoices => {
      invoicesData = invoices;
      this.dataSource.data = invoicesData;
    });
  }

}
