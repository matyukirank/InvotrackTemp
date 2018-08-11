import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import { ProductsService } from '../services/products.service';

export interface ProductsModel {
  productName: String;
  description: String;
  quantity: Number;
  cost: Number;
  date_created: Date;
  date_modified: Date;
}

let productsData: ProductsModel[] = [];

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'productName', 'description', 'quantity', 'cost', 'date_created', 'date_modified'];
  dataSource = new MatTableDataSource<ProductsModel>(productsData);
  selection = new SelectionModel<ProductsModel>(true, []);

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

  constructor(private productsService: ProductsService ) { }

  ngOnInit() {
    this.productsService.getProducts()
    .subscribe(products => {
      productsData = products;
      this.dataSource.data = productsData;
    });
  }

}
