import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AttendanceModule } from 'app/attendance/attendance.module';
import { LineModule } from 'app/line/line.module';
import { PageNotFoundComponent } from 'app/not-found.component';
import { LoginModule } from 'app/user/login.module';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { LoggerService } from './_services/logger.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AttendDialogComponent } from './attendance/add-normal/attend-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AttendDialogComponent,
  ],
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
    LoggerService,
    // ,{ provide: LOCALE_ID, useValue: "zh" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
