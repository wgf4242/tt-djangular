import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatLineModule, MatListModule,
  MatNativeDateModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ElChildModules } from 'element-angular';
import {MyfilterPipe} from "../pipes/myfilter.pipe";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatLineModule,
    MatListModule,
    MatInputModule,
    // ElChildModules.ElDateModule.forRoot(),
    // ElChildModules.ElInputsModule.forRoot(),
  ],
  declarations: [MyfilterPipe],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatLineModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MyfilterPipe,
  ]
})
export class SharedModule { }
