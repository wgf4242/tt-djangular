import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AttandenceComponent } from './attendance/attendance.component';
import { AppRoutingModule } from "app/app-routing.module";
import { LineTourComponent } from './line/line-tour/line-tour.component';
import { LineFacilityComponent } from './line/line-facility/line-facility.component';
import { LineDefectComponent } from './line/line-defect/line-defect.component';
import { PersonService } from "app/attendance/person.service";
import { MonthListComponent } from "app/attendance/month-list.component";
import { MonthDetailComponent } from "app/attendance/month-detail.component";


@NgModule({
  declarations: [
    AppComponent,
    AttandenceComponent,
    MonthListComponent,
    MonthDetailComponent,
    LineTourComponent,
    LineFacilityComponent,
    LineDefectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Title, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
