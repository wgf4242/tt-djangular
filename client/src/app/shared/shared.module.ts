import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatRadioModule, MatToolbarModule, MatSidenavModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyIdPipe } from '../pipes/idpipe.pipe';
import { MyfilterPipe } from '../pipes/myfilter.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    MyfilterPipe,
    MyIdPipe,
  ],
  imports: [
    MatTableModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatLineModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MyfilterPipe,
    MyIdPipe,
    LayoutModule,
  ]
})
export class SharedModule { }
