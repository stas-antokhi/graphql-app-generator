import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  styles: [],
  template: `
    <h1>Are you sure you want to {{data.action}} this {{data.resource}}?</h1>
    <div class="flex justify-center">
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button class="ml-5" mat-raised-button color="primary" [mat-dialog-close]="true">Yes</button>
    </div>
  `
})
export class ConfirmActionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {action: 'delete', resource: string}
  ) { }

  ngOnInit(): void {
  }

}
