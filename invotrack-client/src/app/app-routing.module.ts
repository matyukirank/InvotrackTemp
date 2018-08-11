import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ClientsViewComponent } from './clients-view/clients-view.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usersView', component: UsersViewComponent },
  { path: 'productsView', component: ProductsViewComponent },
  { path: 'clientsView', component: ClientsViewComponent }

];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  declarations: []
})
export class AppRoutingModule { }

