import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PastryService } from '../../api-services/pastry.service';
import {response} from "express";

@Component({
  selector: 'app-delete-pastry',
  standalone: true,
  imports: [],
  templateUrl: './delete-pastry.component.html',
  styleUrl: './delete-pastry.component.css'
})
export class DeletePastryComponent {

  errorMessage: string|null = null;

  constructor(
    private pastryService: PastryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.pastryService.get(parseInt(<string>this.route.snapshot.paramMap.get('id'), 10)).subscribe(
        response => {

        }, error => {
          this.errorMessage = 'erreur';
        }
      );
    } else {
      this.cancel();
    }
  }
  delete() {
    this.pastryService.delete(parseInt(<string>this.route.snapshot.paramMap.get('id'), 10)).subscribe(
      response => {
        this.errorMessage = 'le pastry est supprimé';
        this.cancel();
      }, error => {
        this.errorMessage = 'erreur';
      }
    )

  }

  cancel() {
    this.router.navigate(['home']);
  }
}
