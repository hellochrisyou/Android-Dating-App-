import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { User } from 'src/app/shared/interface/models';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  otherUser: User;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RatingComponent>,
    private userService: UserService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: User
  ) {
    this.otherUser = data;
  }

  ngOnInit() { }

  public setRating(value: number): void {
    this.otherUser.ratingCount++;
    this.otherUser.averageRating = (value + this.otherUser.averageRating) / this.otherUser.ratingCount;
    this.userService.updateUser(this.otherUser);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
