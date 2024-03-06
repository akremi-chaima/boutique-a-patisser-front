import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryInterface} from "../../models/category.interface";
import {FlavourInterface} from "../../models/flavour.interface";
import {SubCollectionInterface} from "../../models/subCollection.interface";
import {Router} from "@angular/router";
import {PastryService} from "../../api-services/pastry.service";
import {CollectionService} from "../../api-services/collection.service";
import {SubCollectionService} from "../../api-services/subCollection.service";
import {CategoryService} from "../../api-services/category.service";
import {FlavourService} from "../../api-services/flavour.service";
import {response} from "express";
import {NgForOf, NgIf} from "@angular/common";
import {HandlePastryInterface} from "../../models/handle-pastry.interface";

@Component({
  selector: 'app-create-pastry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './create-pastry.component.html',
  styleUrl: './create-pastry.component.css'
})
export class CreatePastryComponent {
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  control: FormControl;
  formSubmitted: boolean = false;
  categories: Array<CategoryInterface> = [];
  flavours: Array<FlavourInterface> = [];
  subCollections: Array<SubCollectionInterface> =[];
  errorMessage: string|null = null;
  addedFormats: Array<string> = [];
  errors: any = {
    price: {
      required: `Ce champ est obligatoire.`,
      pattern: `La valeur saisie n'est pas valide.`,
    },
    name: {
      required: `Ce champ est obligatoire.`,
    },
    description: {
      required: `Ce champ est obligatoire.`,
    },
    categoryId: {
      required: `Ce champ est obligatoire.`,
    },
    subCollectionId: {
      required: `Ce champ est obligatoire.`,
    },
    flavourId: {
      required: `Ce champ est obligatoire.`,
    },
  };


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pastryService : PastryService,
    private collectionService: CollectionService,
    private subCollectionService: SubCollectionService,
    private categoryService: CategoryService,
    private flavourService: FlavourService,
  ) {
  }


  ngOnInit() {
    this.formSubmitted = false;
    this.categories = [];
    this.flavours =[];
    this.subCollections = [];
    this.addedFormats = [];
    this.categoryService.getList().subscribe(
      response => {
        this.categories = response;
      }
    )
    this.subCollectionService.getList().subscribe(
      response => {
        this.subCollections = response;
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
    this.form.addControl('subCollectionId', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('categoryId', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('flavourId', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('price', this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]));
    this.form.addControl('description', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('name', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('isVisible', this.formBuilder.control(true, [Validators.required]));
    this.form.addControl('formats', this.formBuilder.control('', null));
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

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const pastry: HandlePastryInterface = {
        id : null,
        name : this.form.get('name')?.value,
        price : this.form.get('price')?.value,
        description : this.form.get('description')?.value,
        isVisible : this.form.get('isVisible')?.value,
        categoryId : parseInt(this.form.get('categoryId')?.value, 10),
        subCollectionId : parseInt(this.form.get('subCollectionId')?.value, 10),
        flavourId : parseInt(this.form.get('flavourId')?.value, 10),
        picture : null,
        formats: this.form.get('formats')?.value
      }
      this.pastryService.create(pastry).subscribe(
        response => {
          this.errorMessage = 'pastry créé avec succes ';
        }, error => {
          this.errorMessage = 'oups le pastry ne peut pas etre créé';
        }
      )
    }

  }

  cancel() {
    this.router.navigate(['home']);
  }

}
