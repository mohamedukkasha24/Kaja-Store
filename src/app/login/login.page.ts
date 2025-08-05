import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  person,
  logoGoogle,
  logoFacebook,
  eye,
  lockClosedOutline,
} from 'ionicons/icons';
import {
  IonContent,
  IonInputPasswordToggle,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonFooter,
  IonText,
  IonRow,
  IonCol,
  IonItem,
  IonCardTitle,
  IonInput,
  IonButton,
  IonIcon,
  IonImg,
  IonLabel,
  AlertController,
  IonSpinner,
  IonLoading,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    ReactiveFormsModule,
    IonInputPasswordToggle,
    RouterLink,
    IonButton,
    IonInput,
    IonCardTitle,
    IonItem,
    IonCol,
    IonRow,
    IonText,
    IonFooter,
    IonGrid,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    addIcons({ person, lockClosedOutline });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    toast.present();
  }

  async login() {
    const { email, password } = this.form.value;

    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent',
      backdropDismiss: false,
      duration: 5000, 
    });
    await loading.present();

    try {
      await this.auth.login(email!, password!);
      await loading.dismiss();
      this.showToast('Login successful!', 'success');
      this.router.navigate(['/home']);
    } catch (err: any) {
      await loading.dismiss();
      this.showToast(err.message || 'Login failed!', 'danger');
    }
  }
}
