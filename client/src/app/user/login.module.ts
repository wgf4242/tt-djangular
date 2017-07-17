import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {AuthenticationService} from "../_services/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

const loginRoutes: Routes = [{path: 'login', component: LoginComponent}];

@NgModule({
  // declarations:[LoginTempComponent],
  declarations: [LoginComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
  providers: [AuthenticationService]
  // providers: [AuthGuard, AuthService]
})
export class LoginModule {
}
