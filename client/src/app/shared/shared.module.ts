import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLineModule,
  MatListModule, MatRadioModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MyfilterPipe} from "../pipes/myfilter.pipe";
import {MyIdPipe} from "../pipes/idpipe.pipe";


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
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
  ],
  declarations: [
    MyfilterPipe,
    MyIdPipe,
  ],
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
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MyfilterPipe,
    MyIdPipe,
  ]
})
export class SharedModule { }
