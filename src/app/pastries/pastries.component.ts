import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PastryInterface } from "../models/pastry.interface";
import {PastryService} from "../api-services/pastry.service";
import {PastriesPaginatorInterface} from "../models/pastries-paginator.interface";
import {PastryFilterInterface} from "../models/pastry-filter.interface";
import {CollectionService} from "../api-services/collection.service";
import {SubCollectionService} from "../api-services/subCollection.service";
import {CollectionInterface} from "../models/collection.interface";
import {SubCollectionInterface} from "../models/subCollection.interface";
import {response} from "express";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-pastries',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.css'
})
export class PastriesComponent {
  @Input()
  hideBanner: boolean | undefined;
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  control: FormControl;
  selectedPastry: PastryInterface|null = null;
  pastries : Array<PastryInterface> = [];
  pastriesPaginator: PastriesPaginatorInterface|null = null;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  pages: Array<number> = [];
  errorMessage: string|null = null;
  pastryFilter: PastryFilterInterface|null = null;
  collections: Array<CollectionInterface> =[];
  subCollections: Array<SubCollectionInterface> =[];
  filteredSubCollections: Array<SubCollectionInterface> =[];

  constructor(
    private pastryService : PastryService,
    private collectionService: CollectionService,
    private subCollectionService: SubCollectionService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.pastries = [];
    this.pastriesPaginator = null;
    this.currentPage = 1;
    this.itemsPerPage = 2;
    this.pages = [];
    this.pastryFilter = null;
    this.collections = [];
    this.subCollections = [];
    this.filteredSubCollections = [];
    this.getPastries(this.currentPage, true);
    this.collectionService.getList().subscribe(
      response => {
        this.collections = response;
      }
    )
    this.subCollectionService.getList().subscribe(
      response => {
        this.subCollections = response;
      }
    )
    this.initForm();

  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('collectionId', this.formBuilder.control('', []));
    this.form.addControl('subCollectionId', this.formBuilder.control('', []));
  }

  getPastries(pageNumber: number, byPassCheck: boolean = false) {
    if ((pageNumber > 0 && pageNumber <= this.pages.length && pageNumber !== this.currentPage) || byPassCheck ) {
      this.currentPage = pageNumber;
      this.pastryService.getListByPaginator(this.currentPage, this.itemsPerPage, this.pastryFilter).subscribe(
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

  // load subCollection by selected collection
  // @ts-ignore
  loadSubCollections($event) {
    // reset filteredSubCollections for each collection selected
    this.filteredSubCollections = [];
    for (let subCollection of this.subCollections) {
      if (subCollection.collection.id === parseInt($event.target.value)) {
        this.filteredSubCollections.push(subCollection);
      }
    }
  }


  add(pastry: any) {

  }

  remove(pastry: any) {

  }

}



