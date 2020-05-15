import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Stars, User } from 'src/app/shared/interface/models';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  stars: [] = []

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {

  }

  public getUserStarValues(email: string): any {
    return this.afs.collection('users').doc(email).collection('stars').valueChanges();
  }
  public getUserStars(email: string): any {
    return this.afs.collection('users').doc(email).collection('stars').snapshotChanges();
  }


  public rateStars(stars: Stars, senderEmail: string): void {
    this.afs.collection('users').doc(senderEmail).collection('stars').add({
      stars: stars,
    });
  }
  public updateStars(star: Stars, email: string, id: any) {
    console.log("StarsService -> updateStars -> this.authService.authState.email", this.authService.authState.email)
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(email).collection('stars').doc(id);
    return userRef.set(Object.assign({}, star), { merge: false });
  }
}
