import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../api-services/address.service';
import { AddressInterface } from '../../../models/address.interface';

@Component({
  selector: 'app-update-address',
  standalone: true,
    imports: [
        FormsModule,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.css'
})
export class UpdateAddressComponent {
  form: FormGroup;
  address: AddressInterface|null;
  control: FormControl;
  formSubmitted: boolean;
  errorMessage: string|null = null;
  errors: any = {
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
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.formSubmitted = false;
    this.address = null;
    this.addressService.get().subscribe(
      response => {
        this.address = response;
        this.initForm();
      }, error => {
        this.errorMessage = 'oups';
      }
    );
  }
  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('zipCode', this.formBuilder.control(this.address.zipCode, [Validators.required]));
    this.form.addControl('street', this.formBuilder.control(this.address.street, [Validators.required]))
    this.form.addControl('city', this.formBuilder.control(this.address.city, [Validators.required]));
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

  save(){
    this.formSubmitted = true;
    if (this.form.valid) {
      const address: AddressInterface = {
        id: this.address.id,
        city: this.form.get('city').value,
        zipCode: this.form.get('zipCode').value,
        street: this.form.get('street').value,
      }
      this.addressService.update(address).subscribe(
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
