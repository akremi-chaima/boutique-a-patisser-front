import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../api-services/user.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
  errors: any = {
    firstName: {
      required: `Ce champ est obligatoire.`,
    },
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    phoneNumber: {
      required: `Ce champ est obligatoire.`,
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
}
