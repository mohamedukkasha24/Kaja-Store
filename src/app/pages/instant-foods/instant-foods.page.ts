import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonMenu, IonMenuButton,IonTitle, IonToolbar, IonAvatar, IonText, IonList, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonSearchbar, IonCard, IonCardContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-instant-foods',
  templateUrl: './instant-foods.page.html',
  styleUrls: ['./instant-foods.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonMenu, IonMenuButton, IonSearchbar, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonList, IonText, IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]

})
export class InstantFoodsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
