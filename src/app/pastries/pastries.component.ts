import { Component, Input } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { PastryInterface } from "../models/pastry.interface";
import {FormatInterface} from "../models/format.interface";

@Component({
  selector: 'app-pastries',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './pastries.component.html',
  styleUrl: './pastries.component.css'
})
export class PastriesComponent {
  @Input()
  hideBanner: boolean | undefined
  selectedPastry: PastryInterface|null = null;
  pastries = [

      {
        name : 'cookie pistachio',
        price : 12,
        description : 'Noisette Gourmande dans une nouvelle version tellement réconfortante avec son coeur praliné ultra fondant aussi régressif qu’addictif',
        isVisible : true,
        category : 'gateau',
        subCollection : 'Les intemporelle',
        flavour: 'noisette',
        picture: '../../assets/img/pastries/product-1.jpg'
      },
    {
      name : 'noisette gourmande',
      price : 7.50,
      description : 'un bon cookie traditionnel au pistache',
      isVisible : true,
      category : 'biscuit',
      subCollection : 'Pistache pistache',
      flavour: 'pistache',
      picture: '../../assets/img/pastries/product-2.jpg'
    },
    {
      name : 'cake marbré',
      price : 20,
      description : 'Mi chocolat – mi nature, en toute simplicité, confectionné avec de bons ingrédients',
      isVisible : true,
      category : 'gateau',
      subCollection : 'Gateaux de voyage',
      flavour: 'chocolat',
      picture: '../../assets/img/pastries/product-3.jpg'
    },
    {
      name : 'cake marbré',
      price : 20,
      description : 'Mi chocolat – mi nature, en toute simplicité, confectionné avec de bons ingrédients',
      isVisible : true,
      category : 'gateau',
      subCollection : 'Gateaux de voyage',
      flavour: 'chocolat',
      picture: '../../assets/img/pastries/product-4.jpg'
    }
 ]

  setSelectedPastry(pastry: any) {
    this.selectedPastry = pastry;
  }

  add(pastry: any) {

  }

  remove(pastry: any) {

  }

}



