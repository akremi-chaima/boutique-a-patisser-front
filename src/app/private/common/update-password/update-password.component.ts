import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UserService } from '../../../api-services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePasswordInterface } from '../../../models/update-password.interface';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  isSamePassword: boolean;
  errorMessage: string|null = null;
  errors: any = {
    password: {
      required: `Ce champ est obligatoire.`,
    },
    newPassword: {
      required: `Ce champ est obligatoire.`,
    },
    newPasswordConfirmation: {
      required: `Ce champ est obligatoire.`,
      pattern: `Le numéro de téléphone saisie n'est pas valide.`
    },
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
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('password', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('newPassword', this.formBuilder.control('', [Validators.required]));
    this.form.addControl('newPasswordConfirmation', this.formBuilder.control('', [Validators.required]));
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
      const data: UpdatePasswordInterface = {
        password: this.form.get('password').value,
        newPassword: this.form.get('newPassword').value,
        newPasswordConfirmation: this.form.get('newPasswordConfirmation').value,
      }
      this.userService.updatePassword(data).subscribe(
        response => {
        },
        error => {
          this.errorMessage = 'le user ne peut pas etre updated'
        }
      )
    }
  }

  cancel(){
    this.router.navigate(['private/orders']);
  }
}
