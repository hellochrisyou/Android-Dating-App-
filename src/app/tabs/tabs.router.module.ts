import { InboxDetailsComponent } from './../pages/inbox/inbox-details/inbox-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: '../pages/inbox/inbox.module#InboxModule'
          }
        ]
      },
      {
        path: 'proposal',
        children: [
          {
            path: '',
            loadChildren: '../pages/proposal/proposal.module#ProposalModule'
          }
        ]
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            loadChildren: '../pages/people/people.module#PeopleModule'
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: '../pages/account/account.module#AccountModule'
          }
        ]
      },
      {
        path: 'support',
        children: [
          {
            path: '',
            loadChildren: '../pages/support/support.module#SupportModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
