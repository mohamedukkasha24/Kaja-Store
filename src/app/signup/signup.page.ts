import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingController, ToastController } from '@ionic/angular';
import { updateProfile } from 'firebase/auth';

import { Firestore } from '@angular/fire/firestore';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonInputPasswordToggle,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonFooter,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  lockClosed,
  lockClosedOutline,
  person,
  textOutline,
} from 'ionicons/icons';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from '@angular/fire/firestore';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    ReactiveFormsModule,
    IonInputPasswordToggle,
    RouterLink,
    IonFooter,
    IonText,
    IonButton,
    IonInput,
    IonItem,
    IonCardTitle,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    CommonModule,
    FormsModule,
  ],
})
export class SignupPage {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: Firestore,
    private alertCtrl: AlertController
  ) {
    addIcons({ textOutline, person, lockClosedOutline, lockClosed });
  }

  form = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  passwordMatchValidator(form: any) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  async signup() {
    const email = this.form.value.email!;
    const password = this.form.value.password!;
    const username = this.form.value.username!;

    const loading = await this.loadingCtrl.create({
      message: 'Creating account...',
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    try {
      // Check if username already exists in 'userdetails' collection
      const usersRef = collection(this.firestore, 'userdetails');
      const q = query(usersRef, where('username', '==', username));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Username Taken',
          message: 'This username is already in use. Please choose another.',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      //  Create Firebase Auth user
      const userCredential = await this.auth.signup(email, password);
      const user = userCredential.user;

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: username,
        photoURL: 'assets/user-profile-icon.avif',
      });
      const defaultPhoto = 'assets/user-profile-icon.avif';
      
      // Save data to Firestore (in 'userdetails')

      await setDoc(doc(this.firestore, 'userdetails', user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        photoURL: defaultPhoto,
      });

      await loading.dismiss();

      const alert = await this.alertCtrl.create({
        header: 'Signup Successful',
        message: 'Account created. Please login.',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/home']); // Redirect to login
    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Signup Failed',
        message: error?.message || 'Something went wrong. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async showToast(message: string, status: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: status,
      position: 'bottom',
    });
    await toast.present();
  }
}
