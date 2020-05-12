import { User } from 'firebase';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { MessagingService } from '../../core/service/messaging.service';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { GET_USERS } from '../../shared/utils/user.util';
import { MessageCount } from '../../shared/interface/interface';
import { Message, Stars } from '../../shared/interface/models';
import { GET_DATE } from '../inbox/inbox.util';
import { ProfileModal } from '../../shared/component/profile/profile.component';
import { UserStateService } from '../../core/service/state/user.state.service';
import { AuthService } from '../../core/service/auth/auth.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RatingComponent } from './rating/rating.component';
import { StarsService } from 'src/app/core/service/stars.service';

@Component({
  selector: 'people-page',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeoplePage implements OnInit {

  users: any[];
  starsExist: any[] = [];
  status = 'people';
  messageCount: MessageCount;
  thisMessage: Message = {};
  tmpMessages: Message[] = [];

  usersTrackFn = (i, user) => user.email;

  constructor(
    public alertCtrl: AlertController,
    public starsService: StarsService,
    public userStateService: UserStateService,
    private authService: AuthService,
    private modalController: ModalController,
    public toastController: ToastController,
    private _bottomSheet: MatBottomSheet,

  ) {
  }

  ngOnInit(): void {
    this.starsExist = this.starsService.getStars();
  }


  public openBottomSheet(userIndex: number): void {
    const peopleUsers = this.userStateService.getPeopleUsers().value
    this._bottomSheet.open(RatingComponent, {
      data: peopleUsers[userIndex]
    }
    );
  }

  async sendMessage(userEmail: string, displayName: string) {
    const alert = await this.alertCtrl.create({
      header: 'Send Message to:',
      subHeader: displayName,
      cssClass: 'center-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: (dataMessage: any) => {
            this.thisMessage.email = this.authService.authState.email;
            this.thisMessage.message = dataMessage.message;
            this.thisMessage.date = GET_DATE();
            this.thisMessage.sender = this.authService.authState.email;
            this.thisMessage.receiver = userEmail;
            this.userStateService.sendMessage(this.thisMessage, this.authService.authState.email, userEmail);
            this.userStateService.sendMessage(this.thisMessage, userEmail, this.authService.authState.email);
            this.userStateService.setPartitionedUsers();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'message',
          placeholder: 'message'
        }
      ]
    });
    await alert.present();
  }
  public navigateProfile(userEmail: string) {
    this.profileModal(userEmail);
  }

  async profileModal(userEmail: string) {
    const modal = await this.modalController.create({
      component: ProfileModal,
      cssClass: 'profileModal',
      componentProps: {
        'email': userEmail
      },
    });
    return await modal.present();
  }

  public logout(): void {
    this.authService.signOut();
  }
  //   public async presentToast(messageArg: string) {
  //     const toast = await this.toastController.create({
  //       header: '',
  //       message: messageArg,
  //       position: 'bottom',
  //       duration: 2000,
  //       buttons: [
  //         {
  //           side: 'start',
  //           icon: 'star',
  //           text: 'Success',
  //           handler: () => {
  //             console.log('Favorite clicked');
  //           }
  //         }
  //       ]
  //     });
  //     toast.present();
  //   }
}

