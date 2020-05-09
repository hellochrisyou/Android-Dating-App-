import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeoplePage } from './people.component';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { RatingComponent } from './rating/rating.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';


@NgModule({
  declarations: [PeoplePage, RatingComponent],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    PeopleRoutingModule
  ],
  entryComponents: [
    RatingComponent
  ],
  providers: [
    {
      provide: MAT_BOTTOM_SHEET_DATA,
      useValue: {}
    }

  ]
})
export class PeopleModule { }
