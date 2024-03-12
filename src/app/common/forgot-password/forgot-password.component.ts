import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';
import { ConstsHelper } from '../../consts.helper';
import { CommonModule } from '@angular/common';
import { UserService } from '../../api-services/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      RouterLink
    ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  control: FormControl;
  formSubmitted: boolean;
  errors: any = {
    email: {
      required: `L'adresse email est obligatoire.`,
      pattern: `L'adresse email saisie n'est pas valide.`
    },
  };

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.formSubmitted = false;
    this.initForm();
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('email', this.formBuilder.control('', [Validators.required, Validators.pattern(ConstsHelper.emailPattern)]));
  }

  send() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userService.resetPassword(this.form.get('email').value).subscribe(
        response => {
          this.initForm()
        }
      );
    }
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

