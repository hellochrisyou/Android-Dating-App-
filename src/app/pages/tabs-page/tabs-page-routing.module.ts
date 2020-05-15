import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs-page';
import { InboxDetailsComponent } from '../inbox/inbox-details/inbox-details.component';
import { LoginModule } from '../login/login.module';


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
            loadChildren: () => import('../inbox/inbox.module').then(m => m.InboxModule)
          },
          {
            path: 'inbox-details',
            component: InboxDetailsComponent
          }
        ]
      },
      {
        path: 'proposal',
        children: [
          {
            path: '',
            loadChildren: () => import('../proposal/proposal.module').then(m => m.ProposalModule)
          }
        ]
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            loadChildren: () => import('../people/people.module').then(m => m.PeopleModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
          }
        ]
      },
      {
        path: 'support',
        children: [
          {
            path: '',
            loadChildren: () => import('../support/support.module').then(m => m.SupportModule)
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
          }
        ]
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            loadChildren: () => import('../signup/signup.module').then(m => m.SignUpModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/account',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

