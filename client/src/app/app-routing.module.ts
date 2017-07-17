import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "app/not-found.component";

import { AppComponent } from "app/app.component";
import {AuthGuard} from "./_guards/auth.guard";


const routes: Routes = [
  // { path: '', canActivate: [AuthGuard],       component: AppComponent },
  { path: '',   redirectTo: 'attendance', pathMatch: 'full' },
  { path: '**',  component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
