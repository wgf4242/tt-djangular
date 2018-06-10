import { NgModule } from '@angular/core';
import { LineDefectFormComponent } from 'app/line/line-defect/line-defect-form.component';
import { LineDefectComponent } from 'app/line/line-defect/line-defect.component';
import { LineFacilityFormComponent } from 'app/line/line-facility/line-facility-form.component';
import { LineFacilityComponent } from 'app/line/line-facility/line-facility.component';
import { LineRoutingModule } from 'app/line/line-routing.module';
import { LineTourFormComponent } from 'app/line/line-tour/line-tour-form.component';
import { LineTourComponent } from 'app/line/line-tour/line-tour.component';
import { ElChildModules } from 'element-angular';
import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { LineInfoComponent } from './line-info/line-info.component';
import { LineProductionDetailComponent } from './line-production-detail/line-production-detail.component';
import { LineProductionFormComponent } from './line-production-detail/line-production-form.component';
import { LineProductionListComponent } from './line-production-list/line-production-list.component';
import { LineRepairComponent } from './line-repair/line-repair.component';
import { FaultFormDialogComponent } from './line-summary/fault-form-dialog/fault-form-dialog.component';
import { LineSummaryComponent, SnackBarTipComponent } from './line-summary/line-summary.component';
import { RecordFormDialogComponent } from './line-summary/record-form-dialog/record-form-dialog.component';
import { TourFormDialogComponent } from './line-summary/tour-form-dialog/tour-form-dialog.component';
import { LineTransformerListComponent } from './line-transformer-list/line-transformer-list.component';
import { LineTransformerComponent } from './line-transformer/line-transformer.component';

@NgModule({
  imports: [
    SharedModule,
    LineRoutingModule,
    NgxPaginationModule,
    ElChildModules.ElDateModule.forRoot(),
    ElChildModules.ElInputsModule.forRoot(),
  ],
  declarations: [
    LineTourComponent,
    LineTourFormComponent,
    LineFacilityComponent,
    LineFacilityFormComponent,
    LineDefectComponent,
    LineDefectFormComponent,
    LineProductionListComponent,
    LineProductionDetailComponent,
    LineProductionFormComponent,
    LineSummaryComponent,
    LineInfoComponent,
    LineRepairComponent,
    LineTransformerComponent,
    LineTransformerListComponent,
    TourFormDialogComponent,
    FaultFormDialogComponent,
    RecordFormDialogComponent,
    SnackBarTipComponent,
  ],
  entryComponents: [
    TourFormDialogComponent,
    FaultFormDialogComponent,
    RecordFormDialogComponent,
    SnackBarTipComponent,
  ]

})

export class LineModule { }
