import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,IonMenuButton, IonToolbar,IonMenu, IonAvatar, IonText, IonItem, IonList, IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-snacks-and-namkeens',
  templateUrl: './snacks-and-namkeens.page.html',
  styleUrls: ['./snacks-and-namkeens.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonSearchbar, IonButton, IonButtons,IonMenuButton, IonMenu,IonIcon, IonLabel, IonList, IonItem, IonText, IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,]

})
export class SnacksAndNamkeensPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
