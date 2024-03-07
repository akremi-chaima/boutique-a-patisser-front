import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../api-services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInterface} from "../../../models/user.interface";
import {response} from "express";

@Component({
  selector: 'app-update-user',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  form: FormGroup;
  user: UserInterface|null;
  control: FormControl;
  formSubmitted: boolean;
  isSamePassword: boolean;
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
    email: {
      required: `Ce champ est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.isSamePassword = true;
    this.user = null;
    this.userService.get().subscribe(
      response => {
        this.user = response;
        this.initForm();
      }, error => {
        this.errorMessage = 'oups le user ne peut pas etre update';
      }
    );
  }


  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('firstName', this.formBuilder.control(this.user.firstName, [Validators.required]));
    this.form.addControl('lastName', this.formBuilder.control(this.user.lastName, [Validators.required]));
    this.form.addControl('email', this.formBuilder.control(this.user.email, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]));
    this.form.addControl('phoneNumber', this.formBuilder.control(this.user.phoneNumber, [Validators.required, Validators.pattern(/^0[1|2|3|4|5|6|7][0-9]{8}$/)]));
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
  save() {
    this.formSubmitted = true;
    this.isSamePassword = true;
    if (this.form.valid) {
      const user: UserInterface = {
        id: this.user.id,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        email: this.form.get('email').value,
        password: null,
        phoneNumber: this.form.get('phoneNumber').value
      }
      this.userService.update(user).subscribe(
        response => {
          this.cancel();
        },
        error => {
          this.errorMessage = 'le user ne peut pas etre updated'
        }
      )
    }
  }

  cancel(){
    this.router.navigate(['home']);
  }
}
