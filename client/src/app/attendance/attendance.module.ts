import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AttendanceRoutingModule} from 'app/attendance/attendance-routing.module';

import {MonthService} from 'app/_services/month.service';
import {PersonService} from 'app/_services/person.service';
import {AttendService} from 'app/_services/attend.service';
import {LineService} from 'app/_services/line.service';

import {AttandenceComponent} from 'app/attendance/attendance.component';
import {AttandenceHomeComponent} from 'app/attendance/attendance-home.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {AddNormalComponent} from './add-normal/add-normal.component';
import {MonthSummaryComponent} from './month-summary/month-summary.component';
import {MonthCommentComponent} from './month-comment/month-comment.component';
import {MonthListComponent} from 'app/attendance/month-list/month-list.component';
import {MonthDetailComponent} from 'app/attendance/month-detail/month-detail.component';

import {AttendDetailComponent} from './attend-detail/attend-detail.component';
import {MonthDateComponent} from 'app/attendance/month-summary/month-date/month-date.component';

import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {AttendSingleFormComponent} from 'app/attendance/add-normal/attend-form/attend-form-single';
import {MonthAddComponent} from './month-add/month-add.component';
import {EditFormComponent} from './add-normal/attend-form/edit-form.component';
import {SharedModule} from '../shared/shared.module';
// import {EditFormComponent} from "./add-normal/attend-form/edit-form.component";

@NgModule({
  imports: [
    SharedModule,
    AttendanceRoutingModule,
    NgxPaginationModule,
    AngularMultiSelectModule
  ],
  declarations: [
    AttandenceComponent,
    AttandenceHomeComponent,
    MonthListComponent,
    MonthDetailComponent,
    AttendSingleFormComponent,
    MonthDateComponent,
    AddNormalComponent,
    MonthSummaryComponent,
    MonthCommentComponent,
    AttendDetailComponent,
    MonthAddComponent,
    // EditFormComponent
    EditFormComponent
  ],
  providers: [LineService, AttendService, PersonService, MonthService]
})
export class AttendanceModule {
}
