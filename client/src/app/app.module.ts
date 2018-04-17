import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {AttendanceModule} from 'app/attendance/attendance.module';
import {PageNotFoundComponent} from 'app/not-found.component';
import {LineModule} from 'app/line/line.module';
import {LoginModule} from 'app/user/login.module';
import {HttpModule} from '@angular/http';
import {AuthGuard} from './_guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpModule,
    AttendanceModule,
    LoginModule,
    LineModule,
    SharedModule,
    CoreModule,
  ],
  providers: [
    Title,
    AuthGuard,
    AuthenticationService,
    // ,{ provide: LOCALE_ID, useValue: "zh" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
