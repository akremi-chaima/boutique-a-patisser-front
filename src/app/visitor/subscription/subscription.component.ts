import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../api-services/user.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserInterface } from '../../models/create-user.interface';
import {response} from "express";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  // @ts-ignore
  form: FormGroup;
  // @ts-ignore
  control: FormControl;
  formSubmitted: boolean = false;
  isSamePassword: boolean = false;
  errorMessage: string|null = null;
  errors: any = {
    firstName: {
      required: `Ce champ est obligatoire.`,
    },
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    phoneNumber: {
      required: `Ce champ est obligatoire.`,
      pattern: `Le numéro de téléphone saisie n'est pas valide.`
    },
    password: {
      required: `Ce champ est obligatoire.`,
    },
    confirmPassword: {
      required: `Ce champ est obligatoire.`,
    },
    email: {
      required: `Ce champ est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    },
    city: {
      required: `Ce champ est obligatoire.`,
    },
    zipCode: {
      required: `Ce champ est obligatoire.`,
    },
    street: {
      required: `Ce champ est obligatoire.`,
    },
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.isSamePassword = true;
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('password', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('confirmPassword', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('firstName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('lastName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]));
    this.form.addControl('phoneNumber', this.formBuilder.control('', [Validators.required, Validators.pattern(/^0[1|2|3|4|5|6|7][0-9]{8}$/)]));
    this.form.addControl('zipCode', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('street', this.formBuilder.control('', [Validators.required]))
    this.form.addControl('city', this.formBuilder.control('', [Validators.required]));
  }

  save() {
    this.formSubmitted = true;
    this.isSamePassword = true;
    if (this.form.valid) {
      if (this.form.get('password').value !== this.form.get('confirmPassword').value) {
        this.isSamePassword = false;
      } else {
        const user: CreateUserInterface = {
          id: null,
          firstName: this.form.get('firstName').value,
          lastName: this.form.get('lastName').value,
          phoneNumber: this.form.get('phoneNumber').value,
          password: this.form.get('password').value,
          email: this.form.get('email').value,
          city: this.form.get('city').value,
          zipCode: this.form.get('zipCode').value,
          street: this.form.get('street').value,
        }
        this.userService.create(user).subscribe(
          response => {
           this.cancel();
          }, error => {
            this.errorMessage = 'oups le user ne peut pas etre créé';
          }
        );
      }
    }

  }

  cancel() {
    this.router.navigate(['home']);
  }

  getError(formControlValues: string): string {
    let errorMsg = '';
    if (this.form.controls[formControlValues].invalid) {
      Object.keys(this.form.controls[formControlValues].errors).map(
        key => {
          errorMsg = this.errors[formControlValues][key];
        }
      );
    }
    return errorMsg;
  }
}
