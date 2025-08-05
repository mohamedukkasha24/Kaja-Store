import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  IonHeader,
  IonImg,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonAvatar,
  IonText,
  IonSearchbar,
  AlertController,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonFooter,
  LoadingController,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { User, updateProfile } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonList,
    RouterLink,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonText,
    IonIcon,
    IonAvatar,
    IonButton,
    IonButtons,
    IonImg,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonMenu,
    IonMenuButton,
    IonSearchbar,
    IonItem,
    IonFooter,
    IonItem,
  ],
})
export class HomePage {
  user: User | null = null;

  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  // Trigger file input when avatar clicked
  onAvatarClick() {
    this.fileInputRef.nativeElement.click();
  }

  // When image is selected
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result as string;

      if (this.user) {
        const loading = await this.loadingCtrl.create({
          message: 'Updating profile picture...',
          spinner: 'crescent',
        });
        await loading.present();

        try {
          // ✅ Call shared AuthService method
          await this.authService.updateProfilePicture(base64Image);

          // ✅ Update UI locally
          this.user = { ...this.user, photoURL: base64Image };

          loading.dismiss();
        } catch (err) {
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Failed to update profile picture.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      }
    };

    reader.readAsDataURL(file); // convert to base64
  }

  async confirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Logging out...',
              spinner: 'circles',
              duration: 3000,
            });
            await loading.present();

            this.authService.logout().then(() => {
              loading.dismiss();
              this.router.navigate(['/login']);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}
}
