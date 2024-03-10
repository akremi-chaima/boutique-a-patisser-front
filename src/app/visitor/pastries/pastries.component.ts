import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PastryInterface } from '../../models/pastry.interface';
import { PastryService } from '../../api-services/pastry.service';
import { PastriesPaginatorInterface } from '../../models/pastries-paginator.interface';
import { PastryFilterInterface } from '../../models/pastry-filter.interface';
import { CollectionService } from '../../api-services/collection.service';
import { SubCollectionService } from '../../api-services/subCollection.service';
import { CollectionInterface } from '../../models/collection.interface';
import { SubCollectionInterface } from '../../models/subCollection.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CategoryInterface } from '../../models/category.interface';
import { FlavourInterface } from '../../models/flavour.interface';
import { CategoryService } from '../../api-services/category.service';
import { FlavourService } from '../../api-services/flavour.service';
import { Router } from '@angular/router';

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
  isPublic: boolean;

  form: FormGroup;
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
  formSubmitted: boolean = false;
  displaySearchForm: boolean = false;
  categories: Array<CategoryInterface> = [];
  flavours: Array<FlavourInterface> = [];
  errors: any = {
    name: {
      pattern: `La valeur saisie n'est pas valide.`
    }
  }

  constructor(
    private pastryService : PastryService,
    private collectionService: CollectionService,
    private subCollectionService: SubCollectionService,
    private categoryService: CategoryService,
    private flavourService: FlavourService,
    private formBuilder: FormBuilder,
    private router: Router,
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
    this.displaySearchForm = false;
    this.categories = [];
    this.flavours = [];
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
    this.categoryService.getList().subscribe(
      response => {
        this.categories = response;
      }
    )
    this.flavourService.getList().subscribe(
      response => {
        this.flavours = response;
      }
    )

    this.initForm();

  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('collectionId', this.formBuilder.control('', []));
    this.form.addControl('subCollectionId', this.formBuilder.control('', []));
    this.form.addControl('categoryId', this.formBuilder.control('', []));
    this.form.addControl('flavourId', this.formBuilder.control('', []));
    this.form.addControl('orderBy', this.formBuilder.control('', []));
    this.form.addControl('name', this.formBuilder.control('', [Validators.pattern(/^([a-zA-Z ]+)$/)]));
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

  searchFormVisibility(display: boolean) {
    this.displaySearchForm = display;
  }

  search() {
    this.formSubmitted = true;
    this.pastryFilter = null;
    if (this.form.valid) {
      this.pastryFilter = {
        collectionId : this.getFieldValue('collectionId'),
        subCollectionId : this.getFieldValue('subCollectionId'),
        name : this.getFieldValue('name'),
        price : null,
        categoryId : this.getFieldValue('categoryId'),
        flavourId: this.getFieldValue('flavourId') ,
        orderBy:this.getFieldValue('orderBy')
      };
      this.getPastries(1, true);
    }
  }

  reset() {
    this.filteredSubCollections = [];
    this.formSubmitted = false;
    this.pastryFilter = null;
    this.searchFormVisibility(false);
    this.getPastries(1, true);
    this.initForm();
  }

  private getFieldValue(field: string) {
    // @ts-ignore
    if (field !== 'orderBy' && this.form.get(field).value !== '') {
      if (field === 'name') {
        // @ts-ignore
        return this.form.get(field).value;
      }
      // @ts-ignore
      return parseInt(this.form.get(field).value);
    } else { // @ts-ignore
      if (field === 'orderBy' && this.form.get(field).value !== '') {
            // @ts-ignore
        return this.form.get(field).value;
      } else {
        return null;
      }
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

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  getError(formControlValues: string): string {
    let errorMsg = '';
    if (this.form.controls[formControlValues].invalid) {
      // @ts-ignore
      Object.keys(this.form.controls[formControlValues].errors).map(
        key => {
          errorMsg = this.errors[formControlValues][key];
        }
      );
    }
    return errorMsg;
  }
}



