import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNormalComponent } from 'app/attendance/add-normal/add-normal.component';
import { AttandenceComponent } from 'app/attendance/attendance.component';
import { MonthDetailComponent } from 'app/attendance/month-detail/month-detail.component';
import { MonthListComponent } from 'app/attendance/month-list/month-list.component';
import { MonthSummaryComponent } from 'app/attendance/month-summary/month-summary.component';
import { AuthGuard } from '../_guards/auth.guard';
import { MonthAddComponent } from './month-add/month-add.component';

const routes: Routes = [
  {
    path: 'attendance',
    component: AttandenceComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'add', pathMatch: 'full', },
          { path: 'months', component: MonthListComponent, data: { title: '历史工时' } },
          { path: 'months/add', component: MonthAddComponent, data: { title: '添加月份' } },
          { path: 'months/:id', component: MonthSummaryComponent, data: { title: '本月汇总' } },
          { path: 'add', component: AddNormalComponent, data: { title: '添加记录' } },
          { path: 'detail', component: MonthDetailComponent, data: { title: '明细表格' } },

        ],
      }]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AttendanceRoutingModule { }
