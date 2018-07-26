import { NgModule } from '@angular/core';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AttendSingleFormComponent } from 'app/attendance/add-normal/attend-form/attend-form-single';
import { AttandenceHomeComponent } from 'app/attendance/attendance-home.component';
import { AttendanceRoutingModule } from 'app/attendance/attendance-routing.module';
import { AttandenceComponent } from 'app/attendance/attendance.component';
import { MonthDetailComponent } from 'app/attendance/month-detail/month-detail.component';
import { MonthListComponent } from 'app/attendance/month-list/month-list.component';
import { MonthDateComponent } from 'app/attendance/month-summary/month-date/month-date.component';
import { AttendService } from 'app/_services/attend.service';
import { LineService } from 'app/_services/line.service';
import { MonthService } from 'app/_services/month.service';
import { PersonService } from 'app/_services/person.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { AddNormalComponent } from './add-normal/add-normal.component';
import { AttendDetailComponent } from './attend-detail/attend-detail.component';
import { MonthAddComponent } from './month-add/month-add.component';
import { MonthCommentComponent } from './month-comment/month-comment.component';
import { MonthSummaryComponent } from './month-summary/month-summary.component';
import { AttendDialogComponent } from 'app/attendance/add-normal/attend-dialog.component';

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
  ],
  entryComponents: [
    AttendDialogComponent
  ],
  providers: [LineService, AttendService, PersonService, MonthService]
})
export class AttendanceModule {
}
