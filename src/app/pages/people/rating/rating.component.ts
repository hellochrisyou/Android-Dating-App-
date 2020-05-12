import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { User, Stars } from 'src/app/shared/interface/models';
import { UserService } from '../../../core/service/user.service';
import { StarsService } from '../../../core/service/stars.service';
import { AuthService } from '../../../core/service/auth/auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  otherUser: User;
  stars: Stars = {};
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RatingComponent>,
    private userService: UserService,
    private authService: AuthService,
    private starsService: StarsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User
  ) {
  }

  ngOnInit() { }

  public setRating(value: number): void {
    this.otherUser = this.data;
    this.stars.sender = this.otherUser.email;
    this.otherUser.ratingCount++;
    this.otherUser.averageRating = (value + this.otherUser.averageRating) / this.otherUser.ratingCount;
    this.userService.updateUser(this.otherUser);
    this.starsService.rateStars(this.stars, this.authService.authState.email)
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
