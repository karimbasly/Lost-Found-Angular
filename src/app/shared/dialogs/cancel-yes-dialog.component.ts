import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  templateUrl: 'cancel-yes-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class CancelYesDialogComponent {
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.title=data.title
  }
}
