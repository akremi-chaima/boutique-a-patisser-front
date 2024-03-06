import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ShopComponent } from './shop/shop.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UpdatePastryComponent } from './administration/update-pastry/update-pastry.component';
import { CreatePastryComponent } from './administration/create-pastry/create-pastry.component';
import { DeletePastryComponent } from './administration/delete-pastry/delete-pastry.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'administration/pastry/update/:id', component: UpdatePastryComponent },
  { path: 'administration/pastry/create', component: CreatePastryComponent },
  { path: 'administration/pastry/delete/:id', component: DeletePastryComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
