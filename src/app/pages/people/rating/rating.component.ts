import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { User, Stars } from 'src/app/shared/interface/models';
import { UserService } from '../../../core/service/user.service';
import { StarsService } from '../../../core/service/stars.service';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserStateService } from 'src/app/core/service/state/user.state.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  otherUser: User;
  stars: any = [];
  thisStar: Stars = {};

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RatingComponent>,
    private userService: UserService,
    private authService: AuthService,
    private starsService: StarsService,
    private userStateService: UserStateService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User
  ) {
  }

  ngOnInit() {

  }


  public setRating(ratingValue: number): void {
    this.otherUser = this.data;
    const starService = this.starsService.getUserStarValues(this.otherUser.email).subscribe(data => {
      this.stars = data;
      this.thisStar.rating = ratingValue;
      this.thisStar.otherEmail = this.authService.authState.email;

      if (undefined !== this.stars.find(findStar => findStar.stars.otherEmail === this.authService.authState.email)) {
        const star = this.stars.find(localStar => localStar.stars.otherEmail === this.authService.authState.email);
        this.otherUser.averageRating = ((this.otherUser.ratingCount * this.otherUser.averageRating) - star.stars.rating + ratingValue) / this.otherUser.ratingCount;
        this.starsService.getUserStars(this.otherUser.email).subscribe(data => {
          const tmpStars = data;
          const tmpStar = tmpStars.find(star => star.payload.doc.data().stars.otherEmail === this.authService.authState.email);

          this.starsService.updateStars(this.thisStar, this.otherUser.email, tmpStar.payload.doc.id)
          this.userService.updateUser(this.otherUser);
        })
      } else {
        this.otherUser.ratingCount++;
        this.otherUser.averageRating = (ratingValue + this.otherUser.averageRating) / this.otherUser.ratingCount;

        this.starsService.rateStars(this.thisStar, this.otherUser.email);
        this.userService.updateUser(this.otherUser);
        starService.unsubscribe();
      }
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
