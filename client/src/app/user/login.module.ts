import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {AuthenticationService} from "../_services/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {SharedModule} from "../shared/shared.module";

const loginRoutes: Routes = [{path: 'login', component: LoginComponent}];

@NgModule({
  // declarations:[LoginTempComponent],
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(loginRoutes)],
  exports: [RouterModule],
  providers: [AuthenticationService]
  // providers: [AuthGuard, AuthService]
})
export class LoginModule {
}
