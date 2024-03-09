import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './visitor/home/home.component';
import { AboutUsComponent } from './visitor/about-us/about-us.component';
import { ContactComponent } from './visitor/contact/contact.component';
import { ShopComponent } from './visitor/shop/shop.component';
import { SubscriptionComponent } from './visitor/subscription/subscription.component';
import { UpdatePastryComponent } from './private/administration/update-pastry/update-pastry.component';
import { CreatePastryComponent } from './private/administration/create-pastry/create-pastry.component';
import { DeletePastryComponent } from './private/administration/delete-pastry/delete-pastry.component';
import { LoginComponent } from './common/login/login.component';
import { LocalStorageService } from './api-services/local-storage.service';
import { ConstsHelper } from './consts.helper';
import { UpdateUserComponent } from './private/customer/update-user/update-user.component';
import { UpdateAddressComponent } from './private/customer/update-address/update-address.component';
import { OrdersListComponent } from './private/administration/orders-list/orders-list.component';
import { OrdersComponent } from './private/customer/orders/orders.component';

export const routes: Routes = [
  /*************************************************** Administrator *******************************************************/
  { path: 'private/administration/orders', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: OrdersListComponent },
  { path: 'private/administration/pastry/update/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: UpdatePastryComponent },
  { path: 'private/administration/pastry/create', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: CreatePastryComponent },
  { path: 'private/administration/pastry/delete/:id', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_ADMINISTRATOR] }, component: DeletePastryComponent },
  /*************************************************** Customer *******************************************************/
  { path: 'private/orders', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER] }, component: OrdersComponent },
  { path: 'private/update/user', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER] }, component: UpdateUserComponent },
  { path: 'private/update/address', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER] }, component: UpdateAddressComponent },
  /*************************************************** Common *******************************************************/
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
