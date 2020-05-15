import { Component, OnInit, Input, AfterViewInit, ContentChild, TemplateRef } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { UserService } from '../../../core/service/user.service';
import { MessagingService } from '../../../core/service/messaging.service';
import { MessageCount } from '../../interface/interface';
import { User } from '../../interface/models';
import { UserStateService } from '../../../core/service/state/user.state.service';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'shared-card-page',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class SharedCardPage implements OnInit {

  @Input() user: User;


  private _messageCounts: MessageCount[] = [];
  private _option: string;
  @Input()
  public get messageCounts(): MessageCount[] {
    return this._messageCounts;
  }
  public set messageCounts(value: MessageCount[]) {
    this._messageCounts = value;
  }

  @Input()
  public get option(): string {
    return this._option;
  }
  public set option(value: string) {
    this._option = value;
  }

  @ContentChild('inboxTemplate', { static: false }) optionTemplateRef: TemplateRef<any>;
  @ContentChild('peopleTemplate', { static: false }) optionTemplateRef2: TemplateRef<any>;
  @ContentChild('proposalBtnTemplate', { static: false }) optionTemplateRef3: TemplateRef<any>;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    public userStateService: UserStateService
  ) { }

  ngOnInit(): void {
    // this.userStateService.users

    this.userService.getUsers().subscribe();
  }

  public checkRating(value: number): string {
    return (this.user.averageRating >= value ? '#ffc107' : '#cccccc')
  }
}


