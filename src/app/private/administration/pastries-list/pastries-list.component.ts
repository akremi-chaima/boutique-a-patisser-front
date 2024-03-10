import { Component, OnInit } from '@angular/core';
import { PastriesComponent } from '../../../visitor/pastries/pastries.component';

@Component({
  selector: 'app-pastries-list',
  standalone: true,
  imports: [
    PastriesComponent
  ],
  templateUrl: './pastries-list.component.html',
  styleUrl: './pastries-list.component.css'
})
export class PastriesListComponent implements OnInit {

  constructor(
  ) {
  }
  ngOnInit() {
  }
}
