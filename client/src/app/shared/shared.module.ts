import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLineModule, MatListModule, MatRadioModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyIdPipe } from '../pipes/idpipe.pipe';
import { MyfilterPipe } from '../pipes/myfilter.pipe';
import { LayoutModule } from '@angular/cdk/layout';


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
    MyfilterPipe,
    MyIdPipe,
    LayoutModule,
  ]
})
export class SharedModule { }
