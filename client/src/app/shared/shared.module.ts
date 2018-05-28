import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatPaginatorModule, MatRadioModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyIdPipe } from '../pipes/idpipe.pipe';
import { MyfilterPipe } from '../pipes/myfilter.pipe';

@NgModule({
  declarations: [
    MyfilterPipe,
    MyIdPipe,
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
    MatPaginatorModule,
    MyfilterPipe,
    MyIdPipe,
    LayoutModule,
  ]
})
export class SharedModule { }
