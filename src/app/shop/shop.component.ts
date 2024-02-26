import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {PastriesComponent} from "../pastries/pastries.component";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    PastriesComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  @Input()
  hideBanner: boolean | undefined
}
