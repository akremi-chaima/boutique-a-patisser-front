import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../../api-services/contact.service";
import {ContactInterface} from "../../models/contact.interface";
import {ConstsHelper} from "../../consts.helper";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input()
  hideBanner: boolean | undefined
  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    lastName: {
      required: `Ce champ est obligatoire.`,
    },
    message: {
      required: `Ce champ est obligatoire.`,
    },
    email: {
      required: `L'adresse email est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    },
    phoneNumber: {
      required: `Ce champ est obligatoire.`,
      pattern: `Ce champ n'est pas valide.`,
    },
  }

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formSubmitted = false;
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('lastName', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('message', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
    this.form.addControl('phoneNumber', this.formBuilder.control('', [Validators.required, Validators.pattern(/^0[1|2|3|4|5|6|7][0-9]{8}$/)]));
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

  send() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const contactInterface: ContactInterface = this.form.getRawValue();
      this.contactService.send(contactInterface).subscribe(
        response => {
          this.initForm()
        }
      );
    }
  }
}
