import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineRoutingModule } from 'app/line/line-routing.module';
import { LineTourFormComponent } from 'app/line/line-tour/line-tour-form.component';
import { LineTourComponent } from 'app/line/line-tour/line-tour.component';
import { LineFacilityComponent } from 'app/line/line-facility/line-facility.component';
import { LineDefectComponent } from 'app/line/line-defect/line-defect.component';
import { LineFacilityFormComponent } from 'app/line/line-facility/line-facility-form.component';
import { LineDefectFormComponent } from 'app/line/line-defect/line-defect-form.component';
import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination';
import { LineProductionListComponent } from './line-production-list/line-production-list.component';
import { LineProductionDetailComponent } from './line-production-detail/line-production-detail.component';
import {LineProductionFormComponent} from "./line-production-detail/line-production-form.component";
import {LineSummaryComponent} from "./line-summary/line-summary.component";
import { LineInfoComponent } from './line-info/line-info.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LineRoutingModule,
    NgxPaginationModule
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
    LineInfoComponent
  ],
  providers: []
})

export class LineModule { }
