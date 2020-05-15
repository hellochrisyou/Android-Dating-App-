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
