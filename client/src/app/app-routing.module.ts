import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttandenceComponent } from "app/attendance/attendance.component";
import { LineFacilityComponent } from "app/line/line-facility/line-facility.component";
import { LineTourComponent } from "app/line/line-tour/line-tour.component";
import { LineDefectComponent } from "app/line/line-defect/line-defect.component";
import { AppComponent } from "app/app.component";
import { MonthListComponent } from "app/attendance/month-list.component";
import { MonthDetailComponent } from "app/attendance/month-detail.component";

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'attendance',  component: AttandenceComponent, data: {title: '工时管理'} },
  { path: 'months',  component: MonthListComponent, data: {title: '历史工时'} },
  { path: 'months/:id',  component: MonthDetailComponent },
  { path: 'line/defect',  component: LineDefectComponent, data: {title: '缺陷管理'}  },
  { path: 'line/facility',  component: LineFacilityComponent, data: {title: '设备管理'}  },
  { path: 'line/tour',  component: LineTourComponent, data: {title: '线路巡视'}  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
