import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';


@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  styleUrls: ['./support.scss'],
})
export class SupportPage {

  constructor(
    public authService: AuthService
  ) { }
  public logout(): void {
    this.authService.signOut();
  }
}
