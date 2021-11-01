import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'app-graphql-app',
  templateUrl: './graphql-app.component.html',
  styleUrls: ['./graphql-app.component.scss']
})
export class GraphqlAppComponent implements OnInit {

  @Input() app!: Graphql.App | undefined;

  isDescriptorFormValid = false;
  isSchemaValid = false;
  isMappingsValid = false;

  descriptor!: Graphql.Descriptor;
  schema!: string;
  mappings: any;

  @ViewChild('stepper') stepper!: MatStepper;

  constructor() { }


  ngOnInit(): void {
    if(this.app !== undefined) {
      this.descriptor = this.app.descriptor;
      this.schema = this.app.schema;
      this.mappings = JSON.stringify(this.app.mappings, null, 2);
    }
  }


  onValidDescriptorForm(isValid: boolean) {
    console.log(isValid)
    this.isDescriptorFormValid = isValid;
  }

  onValidSchema(isValid: boolean) {
    this.isSchemaValid = isValid;
  }

  onValidMappings(isValid: boolean) {
    this.isMappingsValid = isValid;
  }

  onMappingsNext() {
    if(this.isMappingsValid === true) {
      this.stepper.next();
    }
  }


  getApp(): Graphql.App {
    return {
      descriptor: this.descriptor,
      schema: this.schema.replace(/\n/g, ''),
      mappings: JSON.parse(this.mappings)
    }
  }

}
