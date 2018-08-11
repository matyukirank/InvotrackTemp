import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersViewComponent } from './users-view/users-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// services
import { UsersService } from './services/users.service';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ClientsService } from './services/clients.service';
import { ProductsService } from './services/products.service';
import { InvoicesService } from './services/invoices.service';
import { HeaderComponent } from './header/header.component';
import { ClientsViewComponent } from './clients-view/clients-view.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UsersViewComponent,
    ProductsViewComponent,
    HeaderComponent,
    ClientsViewComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    UsersService,
    ClientsService,
    ProductsService,
    InvoicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
