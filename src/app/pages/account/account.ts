import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ImageService } from '../../core/service/image.service';
import { UserService } from '../../core/service/user.service';
import { Image, User } from '../../shared/interface/models';
import { AuthService } from './../../core/service/auth/auth.service';

declare var $: any;

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit, AfterViewInit {


  public get authState(): any {
    return this._authState;
  }
  public set authState(value: any) {
    this._authState = value;
  }



  ages: number[] = [];
  religions: string[] = ['Atheism', 'Buddhism', 'Christianity', 'Catholicism', 'Hinduism', 'Islam', 'Judaism', 'Other'];
  kidsOptions: string[] = ['Yes', 'No', 'Maybe', 'No opinion'];
  compareWith: any;
  user: any = {};
  userRef: AngularFirestoreDocument<any>;
  username: string;
  public selectedFile: File;
  selectedFileName = 'Select File';
  thisImage: Image = {};
  messageRef: AngularFirestoreDocument<any>;
  imageRef: AngularFirestoreDocument<any>;
  tmpImages: any;
  deletedPhoto: string;
  images: any[] = [];
  imageUrls: string[] = [];
  file: any = {};
  selectedAge: number;
  selectedReligion: string;
  selectedKids: string;
  imageNameRef: any;

  private _authState: any = null;

  ageActionSheetOptions: any = {
    header: 'Select your age'
  };
  religionActionSheetOptions: any = {
    header: 'Select your religion'
  };
  kidsActionSheetOptions: any = {
    header: 'Select your religion'
  };

  imagesTrackFn = (i, image) => image.photoName;

  constructor(
    protected fb: FormBuilder,
    public changeDetectorRefs: ChangeDetectorRef,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public imageService: ImageService,
    public alertController: AlertController,
    public router: Router,
    public userService: UserService,
    public modalController: ModalController,
  ) {
  }
  ngOnInit(): void {

    for (let i = 18; i < 99; i++) {
      this.ages.push(i);
    }

    this.userRef = this.userService.getUser(this.authService.authState.email);
    this.userRef.get().subscribe(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        this.user = doc.data();
      }
    }, (err => {
      // console.log('Error fetching document: ', err);
    }));
  }

  ngAfterViewInit() {
    // this.getUsername();
  }


  public logout(): void {
    this.authService.signOut();
  }


  public updateUserData() {
    // Sets user data to firestore on login
    const data: User = {
      uid: this.authService.authState.uid,
      email: this.authService.authState.email,
      photoURL: this.user.photoUrl,
      displayName: this.user.displayName,
      title: this.user.title,
      hobbies: this.user.hobbies,
      description: this.user.description,
      age: this.user.age,
      religion: this.user.religion,
      haveKids: this.user.haveKids,
    };
    return this.userRef.set(data, { merge: true });
  }
  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing

  async updateAvatar() {
    const alert = await this.alertCtrl.create({
      header: 'Change Profile Picture',
      cssClass: 'center-alert',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.user.photoURL = data.url;
            this.updateUserData();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'url',
          placeholder: this.user.photoURL
        }
      ]
    });
    await alert.present();
  }
  async updateUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      cssClass: 'center-alert',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            if (!this.error30LengthValidation(data.username)) {
              this.user.displayName = data.username;
              this.updateUserData();
            } else {
              this.toastMessage('Too many characters')
            }

          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          placeholder: this.user.displayName
        }
      ]
    });
    await alert.present();
  }
  async updateTitle() {
    const alert = await this.alertCtrl.create({
      header: 'Change Title',
      cssClass: 'center-alert',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('data length', data.title);
            if (!this.error30LengthValidation(data.title)) {
              this.user.title = data.title;
              this.updateUserData();
            } else {
              this.toastMessage('Too many characters')
            }
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: this.user.title
        }
      ]
    });
    await alert.present();
  }

  public updateAge(): void {
    this.user.age = this.selectedAge;
    this.updateUserData();
  }
  public updateReligion(): void {
    this.user.religion = this.selectedReligion;
    this.updateUserData();
  } public updateHaveKids(): void {
    this.user.haveKids = this.selectedKids;
    this.updateUserData();
  }

  public error30LengthValidation(input: string): boolean {
    return (input.length > 30 ? true : false);
  }

  public error100LengthValidation(input: string): boolean {
    return (input.length > 100 ? true : false);
  }

  public async toastMessage(messageArg: string) {
    const toast = await this.alertController.create({
      header: 'Validation Failed',
      message: messageArg,
      cssClass: 'center-alert',
      buttons: ['OK'],
    });
    toast.present();
  }
  async updateHobbies() {
    const alert = await this.alertCtrl.create({
      header: 'Change Hobbies',
      cssClass: 'center-alert',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            if (!this.error100LengthValidation(data.hobbies)) {
              this.user.hobbies = data.hobbies;
              this.updateUserData();
            } else {
              this.toastMessage('Too many characters')
            }
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'hobbies',
          placeholder: this.user.hobbies
        }
      ]
    });
    await alert.present();
  }
  async updateDescription() {
    const alert = await this.alertCtrl.create({
      header: 'Update Description',
      cssClass: 'center-alert',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            if (!this.error100LengthValidation(data.description)) {
              this.user.description = data.description;
              this.updateUserData();
            } else {
              this.toastMessage('Too many characters')
            }
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'description',
          placeholder: this.user.description
        }
      ]
    });
    await alert.present();
  }

  // // updatePassword() {
  // //   console.log('Clicked to update password');
  // // }

  async existsAlert() {
    const alert = await this.alertController.create({
      header: 'Image Upload Error',
      cssClass: 'center-alert',
      message: 'Image already exists'
    });

    await alert.present();
  }
}
