import { Component, Input, OnInit } from '@angular/core';
import { Graphql } from 'src/app/shared/models/graphql';

@Component({
  selector: 'gql-app-card[app]',
  template: `
    <mat-card class="col-span-2 cursor-pointer">

      <mat-card-title class="text-lg text-center">
        <h1>{{app.name}}</h1>
      </mat-card-title>

      <mat-card-content class="flex flex-col">
        <p class="flex-1 text-lg mb-5">
          {{app.description}}
        </p>

        <div class="flex justify-between">
          <p class="font-bold">{{uriPrefix}}{{app.uri}}</p>
          <p [ngClass]="app.enabled ? 'text-green-500' : 'text-red-500'">{{app.enabled ? 'Enabled' : 'Disabled'}}</p>
        </div>
      </mat-card-content>


    </mat-card>
`,
  styles: []
})
export class AppCardComponent implements OnInit {

  @Input() app: Graphql.Descriptor = {} as Graphql.Descriptor;
  @Input() uriPrefix: string = 'graphql/';

  constructor() { }

  ngOnInit(): void {
  }

}
