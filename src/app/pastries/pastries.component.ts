import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PastryInterface } from "../models/pastry.interface";
import {PastryService} from "../api-services/pastry.service";
import {PastriesPaginatorInterface} from "../models/pastries-paginator.interface";

@Component({
  selector: 'app-pastries',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.css'
})
export class PastriesComponent {
  @Input()
  hideBanner: boolean | undefined
  selectedPastry: PastryInterface|null = null;
  pastries : Array<PastryInterface> = [];
  pastriesPaginator: PastriesPaginatorInterface|null = null;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  pages: Array<number> = [];
  errorMessage: string|null = null;

  constructor(
    private pastryService : PastryService,
  ) {
  }

  ngOnInit() {
    this.pastries = [];
    this.pastriesPaginator = null;
    this.currentPage = 1;
    this.itemsPerPage = 2;
    this.pages = [];
    this.getPastries(this.currentPage, true);

  }

  getPastries(pageNumber: number, byPassCheck: boolean = false) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || byPassCheck ) {
      this.currentPage = pageNumber;
      this.pastryService.getListByPaginator(this.currentPage, this.itemsPerPage).subscribe(
        response => {
          this.pastriesPaginator = response;
          // display warning message if no vehicle was found
          if (this.pastriesPaginator.data.length === 0) {
            this.errorMessage = 'Aucun résultat';
          }
          // fill pages for paginator
          this.pages = [];
          let pagesNumber = this.pastriesPaginator.totalItems / this.itemsPerPage;
          if (this.pastriesPaginator.totalItems % this.itemsPerPage > 0) {
            pagesNumber++;
          }
          for (let i = 1; i <= pagesNumber; i++) {
            this.pages.push(i);
          }
        }, error => {
            this.errorMessage = 'Oups, nous avons rencontré un petit souci';
        }
      );
    }
  }

  setSelectedPastry(pastry: any) {
    this.selectedPastry = pastry;
  }

  add(pastry: any) {

  }

  remove(pastry: any) {

  }

}



