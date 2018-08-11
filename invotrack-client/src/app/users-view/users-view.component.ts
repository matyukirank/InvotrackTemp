import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { UsersService } from '../services/users.service';

export interface UsersModel {
    username: String;
    password: String;
    access: String;
    date_created: Date;
    date_modified: Date;
}

let usersData: UsersModel[] = [];


@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})

export class UsersViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'username', 'password', 'access', 'date_created', 'date_modified'];
  dataSource = new MatTableDataSource<UsersModel>(usersData);
  selection = new SelectionModel<UsersModel>(true, []);

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
  constructor(private usersService: UsersService ) { }

  ngOnInit() {
    this.usersService.getUsers()
    .subscribe(users => {
      usersData = users;
      this.dataSource.data = usersData;
    });
  }

}
