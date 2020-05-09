import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/service/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignUpModule',
  },
  {
    path: 'app',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
