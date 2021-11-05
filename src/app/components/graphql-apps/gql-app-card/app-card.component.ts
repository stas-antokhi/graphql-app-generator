import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionDialogComponent } from 'src/app/shared/components/confirm-action-dialog/confirm-action-dialog.component';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'gql-app-card[app]',
  template: `
    <mat-card class="flex-grow flex flex-col">

      <mat-card-title class="text-lg text-center">
        <h1>{{app.descriptor.name}}</h1>
      </mat-card-title>

      <mat-card-content class="flex flex-col flex-grow">
        <p class="text-lg mb-5 flex-grow">
          {{app.descriptor.description || ''}}
        </p>

        <div class="flex justify-between">
          <p class="font-bold">{{app.descriptor.uri}}</p>
          <p [ngClass]="app.descriptor.enabled ? 'text-success-500' : 'text-gray-500'">{{app.descriptor.enabled ? 'Enabled' : 'Disabled'}}</p>
        </div>
      </mat-card-content>

      <mat-card-actions class="flex justify-end">
        <button mat-icon-button color="primary" [routerLink]="[app._id?.$oid, 'edit']">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" (click)="openConfirmationDialog()">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-card-actions>


    </mat-card>

`,
  styles: []
})
export class AppCardComponent implements OnInit {

  @Input() app!: Graphql.App;
  @Output() delete = new EventEmitter<{$oid: string}>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openConfirmationDialog() {
    this.dialog.open(ConfirmActionDialogComponent, {
      data: {
        resource: 'app',
        action: 'delete'
      }
    }).afterClosed().subscribe(response => {
      if(response === true) {
        this.delete.emit(this.app._id);
      }
    })
  }

}
