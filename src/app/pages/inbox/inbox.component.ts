import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/service/auth/auth.service';

import { EmitService } from '../../core/service/emit.service';
import { ProposalService } from '../../core/service/proposal.service';
import { MessagingStateService } from '../../core/service/state/messaging.state.service';
import { UserStateService } from '../../core/service/state/user.state.service';
import { ProfileModal } from '../../shared/component/profile/profile.component';
import { Message, Proposal } from '../../shared/interface/models';
import { GET_TODAY_DATE } from './inbox.util';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RatingComponent } from '../people/rating/rating.component';

declare var google: any;
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {

  thisProposal: Proposal = {};
  status = 'inbox';
  thisMessage: Message;
  tmpMessages: Message[] = [];

  usersTrackFn = (i, user) => user.email;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private messagingStateService: MessagingStateService,
    public userStateService: UserStateService,
    public alertCtrl: AlertController,
    public toastController: ToastController,
    public proposalService: ProposalService,
    public modalController: ModalController,
    public emitService: EmitService,
    private _bottomSheet: MatBottomSheet,

  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log("InboxComponent -> ngOnInit -> userStateService.inboxUsers$", this.userStateService.inboxUsers$)
  }

  public navigateMessages(userEmail: string, displayNameArg: string) {
    this.messagingStateService.setMessageUser(this.authService.authState.email, userEmail);
    const navigationExtras = {
      state: {
        displayName: displayNameArg,
        email: userEmail
      }
    };
    this.navCtrl.navigateForward(['app/tabs/inbox/inbox-details'], navigationExtras);
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

  public openBottomSheet(userIndex: number): void {
    const inboxUsers = this.userStateService.getInboxUsers().value
    console.log("PeoplePage -> openBottomSheet -> peopleUsers", inboxUsers[userIndex].averageRating)
    this._bottomSheet.open(RatingComponent, {
      data: inboxUsers[userIndex]
    }
    );
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
  public logout(): void {
    this.authService.signOut();
  }
  async submitProposal(userName: string, userEmail: string) {
    const todaysDate = GET_TODAY_DATE();

    const alert = await this.alertCtrl.create({
      header: 'Send Proposal to:',
      subHeader: userName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Ok',
          handler: (dataProposal: any) => {
            this.thisProposal.select = 'select';
            this.thisProposal.street = dataProposal.street;
            this.thisProposal.city = dataProposal.city;
            this.thisProposal.state = dataProposal.state;
            this.thisProposal.zipcode = dataProposal.zipcode;
            this.thisProposal.proposalDate = dataProposal.proposalDate;
            this.thisProposal.sender = this.authService.authState.displayName;
            this.thisProposal.email = this.authService.authState.email;
            this.thisProposal.status = null;

            // this.proposalService.sendProposal(this.thisProposal, this.authService.authState.email);
            this.proposalService.sendProposal(this.thisProposal, userEmail);
            this.userStateService.setPartitionedUsers();

            this.presentToast('Your proposal has been sent');
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'street',
          placeholder: 'Street'
        },
        {
          type: 'text',
          name: 'city',
          placeholder: 'City'
        },
        {
          type: 'text',
          name: 'state',
          placeholder: 'State'
        },
        {
          type: 'number',
          name: 'zipcode',
          min: 0,
          placeholder: 'Zipcode'
        },
        {
          name: 'proposalDate',
          type: 'date',
          min: todaysDate,
          // max: ''
        },
      ]
    });
    await alert.present();
  }
}
