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
import { OrdersComponent } from './private/customer/orders/orders.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'administration/pastry/update/:id', component: UpdatePastryComponent },
  { path: 'administration/pastry/create', component: CreatePastryComponent },
  { path: 'administration/pastry/delete/:id', component: DeletePastryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'private/orders', canActivate: [LocalStorageService], data: { expectedRoles: [ConstsHelper.ROLE_CUSTOMER, ConstsHelper.ROLE_ADMINISTRATOR] }, component: OrdersComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
