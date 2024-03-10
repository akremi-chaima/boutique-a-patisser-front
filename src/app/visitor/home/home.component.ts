import { Component } from '@angular/core';
import { AboutUsComponent } from '../about-us/about-us.component';
import { TeamComponent } from '../team/team.component';
import { InstagramComponent } from '../../common/instagram/instagram.component';
import { ContactComponent } from '../contact/contact.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { UpdatePastryComponent } from '../../private/administration/update-pastry/update-pastry.component';
import { PastriesComponent } from '../pastries/pastries.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutUsComponent,
    TeamComponent,
    InstagramComponent,
    ContactComponent,
    TestimonialComponent,
    UpdatePastryComponent,
    PastriesComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
