import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

import { ImageService } from '../../../core/service/image.service';
import { UserService } from '../../../core/service/user.service';
import { Proposal } from '../../interface/models';
import { UserStateService } from '../../../core/service/state/user.state.service';

@Component({
  selector: 'shared-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileModal implements OnInit {

  selected = new FormControl(0);
  users: any[];
  thisProposal: Proposal = {};
  images: any[];
  imageUrls: string[] = [];

  private _email: string;

  @Input()
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    console.log("ProfileModal -> setemail -> value", value)
    this._email = value;
    this.userStateService.setUser(this._email);
  }


  constructor(
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public imageService: ImageService,
    public modalCtrl: ModalController,
    public toastController: ToastController,
    public navParams: NavParams,
    public userStateService: UserStateService

  ) {
    this._email = navParams.get('email');
  }


  ngOnInit() {
    console.log('selected user', this.userStateService.selectedUser);
  }


  public closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  public async presentToast(messageArg: string) {
    const toast = await this.toastController.create({
      header: '',
      message: messageArg,
      position: 'bottom',
      duration: 2000,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Success',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }
}