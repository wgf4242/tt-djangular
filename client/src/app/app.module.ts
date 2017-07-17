import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from 'app/app-routing.module';

import {AttendanceModule} from 'app/attendance/attendance.module';
import {PageNotFoundComponent} from 'app/not-found.component';
import {LineModule} from 'app/line/line.module';
import {LoginModule} from 'app/user/login.module';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import { LineSummaryComponent } from './line/line-summary/line-summary.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AttendanceModule,
    LoginModule,
    LineModule,
    AppRoutingModule //put the default and wildcard routes last,
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
