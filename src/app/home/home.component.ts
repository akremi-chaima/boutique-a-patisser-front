import { Component } from '@angular/core';
import {AboutUsComponent} from "../about-us/about-us.component";
import {TeamComponent} from "../team/team.component";
import {InstagramComponent} from "../instagram/instagram.component";
import {ContactComponent} from "../contact/contact.component";
import {TestimonialComponent} from "../testimonial/testimonial.component";
import {ShopComponent} from "../shop/shop.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutUsComponent,
    TeamComponent,
    InstagramComponent,
    ContactComponent,
    TestimonialComponent,
    ShopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
