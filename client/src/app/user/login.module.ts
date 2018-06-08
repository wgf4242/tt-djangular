import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [{ path: 'login', component: LoginComponent }];

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
