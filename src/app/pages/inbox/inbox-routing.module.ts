import { InboxComponent } from "./inbox.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InboxDetailsComponent } from "./inbox-details/inbox-details.component";
import { AuthGuard } from "src/app/core/service/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: InboxComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "inbox-details",
    component: InboxDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}
