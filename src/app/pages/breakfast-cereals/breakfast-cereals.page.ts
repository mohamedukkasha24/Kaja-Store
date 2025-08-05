import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonMenuButton,
  IonToolbar,
  IonMenu,
  IonAvatar,
  IonText,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-breakfast-cereals',
  templateUrl: './breakfast-cereals.page.html',
  styleUrls: ['./breakfast-cereals.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCard,
    IonSearchbar,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonIcon,
    IonLabel,
    IonList,
    IonItem,
    IonText,
    IonAvatar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class BreakfastCerealsPage implements OnInit {
  constructor() {}

  ngOnInit() {
    this.updatePrice();
    this.updatePrice2();
  }

  selectedGram: string = '26gm';
  price: number = 9.8;
  originalPrice: number = 10;
  updatePrice() {
   
    switch (this.selectedGram) {
      case '26gm':
        this.originalPrice = 10;
        this.price = 9.8;
        break;
      case '35gm':
        this.originalPrice = 15;
        this.price = 14.5;
        break;
      case '60gm':
        this.originalPrice = 25;
        this.price = 24.5;
        break;
      case '250gm':
        this.originalPrice = 90;
        this.price = 88.5;
        break;
      case '375gm':
        this.originalPrice = 120;
        this.price = 118;
        break;
      default:
        this.price = 0;
        this.originalPrice = 0;
    }
  }

  selectedWeight: string = '200gm';
  price2: number = 53.5;
  originalPrice2: number = 55;
  updatePrice2() {
    switch (this.selectedWeight) {
      case '200gm':
        this.originalPrice2 = 55;
        this.price2 = 53.5;
        break;
      case '500gm':
        this.originalPrice2 = 120;
        this.price2 = 115;
        break;
      case '900gm':
        this.originalPrice2 = 200;
        this.price2 = 190;
        break;
      default:
        this.originalPrice2 = 0;
        this.price2 = 0;
    }
  }
}
