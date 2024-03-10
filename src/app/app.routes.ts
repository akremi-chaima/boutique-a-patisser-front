import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { AboutUsComponent } from './visitor/about-us/about-us.component';
import { ContactComponent } from './visitor/contact/contact.component';
import { SubscriptionComponent } from './visitor/subscription/subscription.component';
import { UpdatePastryComponent } from './private/administration/update-pastry/update-pastry.component';
import { CreatePastryComponent } from './private/administration/create-pastry/create-pastry.component';
import { DeletePastryComponent } from './private/administration/delete-pastry/delete-pastry.component';
import { LoginComponent } from './common/login/login.component';
import { LocalStorageService } from './api-services/local-storage.service';
import { ConstsHelper } from './consts.helper';
import { UpdateUserComponent } from './private/customer/update-user/update-user.component';
import { OrdersListComponent } from './private/administration/orders-list/orders-list.component';
import { OrdersComponent } from './private/customer/orders/orders.component';
import { UpdatePasswordComponent } from './private/common/update-password/update-password.component';
import { PastriesListComponent } from './private/administration/pastries-list/pastries-list.component';

export const routes: Routes = [
  /*************************************************** Administrator *******************************************************/
  { path: 'private/administration/orders', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: OrdersListComponent },
  { path: 'private/administration/products', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: PastriesListComponent },
  { path: 'private/administration/pastry/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdatePastryComponent },
  { path: 'private/administration/pastry/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreatePastryComponent },
  { path: 'private/administration/pastry/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeletePastryComponent },
  /*************************************************** Customer *******************************************************/
  { path: 'private/orders', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER] }, component: OrdersComponent },
  { path: 'private/coordinates', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER] }, component: UpdateUserComponent },
  /*************************************************** Common *******************************************************/
  { path: 'private/update/password', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR, ConstsHelper.ROLE_CUSTOMER] }, component: UpdatePasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
