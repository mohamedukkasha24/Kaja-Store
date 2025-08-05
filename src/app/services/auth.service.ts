import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { doc, updateDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async updateProfilePicture(base64Image: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) throw new Error('No user logged in');

    //  1. Update Firebase Auth profile
    await updateProfile(user, {
      photoURL: base64Image,
    });

    // 2. Update Firestore `userdetails` document
    const userRef = doc(this.firestore, 'userdetails', user.uid);
    await updateDoc(userRef, {
      photoURL: base64Image,
    });

    // 3. Refresh Firebase Auth user object
    await user.reload(); // ⬅ This updates latest photoURL/displayName from Firebase

    //  4. Emit latest user to subscribers (like in HomePage, ion-footer, etc.)
    this.currentUserSubject.next(this.auth.currentUser); // ⬅ Force update to UI
  }
}
