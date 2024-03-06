import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamComponent } from '../team/team.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    TeamComponent,
    TestimonialComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  @Input()
  hideBanner: boolean | undefined
}
