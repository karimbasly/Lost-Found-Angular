import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';

import {MaterialModule} from '@shared/material.module';
import {CancelYesDialogComponent} from '@shared/dialogs/cancel-yes-dialog.component';
import {LoginDialogComponent} from '@shared/dialogs/login-dialog.component';
import {ReadDetailDialogComponent} from '../home/users/user-detail.dialog.component';
import {UppercaseWords} from '@shared/pipes/UppercaseWordsPipe';
import {CrudComponent} from '@shared/components/crud.component';
import {SearchComponent} from '@shared/components/search.component';
import {registerDialogComponent} from "@shared/dialogs/register-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    LoginDialogComponent,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
    registerDialogComponent
  ],
  exports: [
    CancelYesDialogComponent,
    CommonModule,
    CrudComponent,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    LoginDialogComponent,
    MaterialModule,
    ReadDetailDialogComponent,
    SearchComponent,
    UppercaseWords,
  ],
  entryComponents: [
    CancelYesDialogComponent,
    LoginDialogComponent,
    ReadDetailDialogComponent,
  ]
})
export class SharedModule {
}
