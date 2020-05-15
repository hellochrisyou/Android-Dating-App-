import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedCardPage } from './component/card/card.component';
import { ProfileModal } from './component/profile/profile.component';
import { TableComponent } from './component/table/table.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [TableComponent, ProfileModal, SharedCardPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    TableComponent,
    ProfileModal,
    SharedCardPage
  ],
  providers: [
    AngularFirestore
  ],
  entryComponents: [
    ProfileModal,
  ]
})
export class SharedModule { }
