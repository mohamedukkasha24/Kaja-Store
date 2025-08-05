import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonMenu, IonMenuButton,IonTitle, IonToolbar, IonAvatar, IonText, IonList, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonSearchbar, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rice-product',
  templateUrl: './rice-product.page.html',
  styleUrls: ['./rice-product.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonMenu, IonMenuButton, IonSearchbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonText, IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RiceProductPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
