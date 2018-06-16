import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineDefectFormComponent } from 'app/line/line-defect/line-defect-form.component';
import { LineDefectComponent } from 'app/line/line-defect/line-defect.component';
import { LineFacilityComponent } from 'app/line/line-facility/line-facility.component';
import { AuthGuard } from '../_guards/auth.guard';
import { LineFacilityFormComponent } from './line-facility/line-facility-form.component';
import { LineInfoComponent } from './line-info/line-info.component';
import { LineProductionFormComponent } from './line-production-detail/line-production-form.component';
import { LineProductionListComponent } from './line-production-list/line-production-list.component';
import { LineRepairComponent } from './line-repair/line-repair.component';
import { LineSummaryComponent } from './line-summary/line-summary.component';
import { LineTransformerListComponent } from './line-transformer-list/line-transformer-list.component';

const routes: Routes = [

  {path: 'line/facility', component: LineFacilityComponent, data: {title: '设备管理'}, canActivate: [AuthGuard]},
  {path: 'line/facility/add', component: LineFacilityFormComponent, data: {title: '设备管理添加'}, canActivate: [AuthGuard]},
  {path: 'line/defect', component: LineDefectComponent, data: {title: '缺陷管理'}, canActivate: [AuthGuard]},
  {path: 'line/defect/add', component: LineDefectFormComponent, data: {title: '缺陷管理-添加记录'}, canActivate: [AuthGuard]},
  {path: 'line/defect/:id', component: LineDefectFormComponent, data: {title: '缺陷管理-编辑记录'}, canActivate: [AuthGuard]},
  {path: 'line/production', component: LineProductionListComponent, data: {title: '线路管理-投产验收'}, canActivate: [AuthGuard]},
  {path: 'line/production/add', component: LineProductionFormComponent, data: {title: '线路管理-投产验收'}, canActivate: [AuthGuard]},
  {path: 'line/summary', component: LineSummaryComponent, data: {title: '线路管理-月报统计'}, canActivate: [AuthGuard]},
  {path: 'line/info', component: LineInfoComponent, data: {title: '线路管理-线路信息'}, canActivate: [AuthGuard]},
  {path: 'line/repair', component: LineRepairComponent, data: {title: '线路管理-检修管理'}, canActivate: [AuthGuard]},
  {path: 'line/transformer', component: LineTransformerListComponent, data: {title: '线路管理-变压器管理'}, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LineRoutingModule {
}
