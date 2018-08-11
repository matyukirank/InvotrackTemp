import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { ClientsService } from '../services/clients.service';

export interface ClientsModel {
  title: String;
  inits: String;
  surname: String;
  address1: String;
  address2: String;
  town: String;
  code: Number;
  date_created: Date;
  date_modified: Date;
}

let clientsData: ClientsModel[] = [];

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.css']
})
export class ClientsViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'title', 'inits', 'surname', 'address1', 'address2', 'town', 'code',
   'date_created', 'date_modified'];
  dataSource = new MatTableDataSource<ClientsModel>(clientsData);
  selection = new SelectionModel<ClientsModel>(true, []);

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

  constructor(private clientsService: ClientsService ) { }

  ngOnInit() {
    this.clientsService.getClients()
    .subscribe(clients => {
      clientsData = clients;
      this.dataSource.data = clientsData;
    });
  }

}

