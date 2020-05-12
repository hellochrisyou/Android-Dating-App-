import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Stars } from 'src/app/shared/interface/models';
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

  public subscribeStars(): any {
    this.getUserStars(this.authService.authState.email).subscribe(data => {
      console.log("StarsService -> data", data)
      this.stars = data;
    });
  }
  public getUserStars(email: string): any {
    return this.afs.collection('users').doc(email).collection('stars').valueChanges();
  }

  public rateStars(stars: Stars, senderEmail: string): void {

    this.afs.collection('users').doc(senderEmail).collection('stars').add({
      stars: stars,
    });
  }

  public getStars(): any {
    return this.stars;
  }
}
