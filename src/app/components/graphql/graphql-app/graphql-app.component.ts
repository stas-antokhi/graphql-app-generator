import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { GraphQLField, GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLFieldMap, GraphQLInt, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLString, printSchema, Thunk } from 'graphql';
import { BehaviorSubject } from 'rxjs';
import { GraphqlAppsService } from 'src/app/core/services/graphql-apps.service';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'app-graphql-app',
  templateUrl: './graphql-app.component.html',
  styleUrls: ['./graphql-app.component.scss']
})
export class GraphqlAppComponent implements OnInit {

  isDescriptorFormValid = false;
  isSchemaValid = false;
  isMappingsValid = false;

  descriptor!: Graphql.Descriptor;
  schema!: string;
  mappings: any;

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private graphqlSvc: GraphqlAppsService, private router: Router) { }

  ngOnInit(): void {}

  updateDescriptor(descriptor: Graphql.Descriptor) {
    this.descriptor = descriptor;
  }

  updateSchema(schema: string) {
    this.schema = schema;
  }

  updateMappings(mappings: any) {
    this.mappings = mappings;
  }

  onValidDescriptorForm(isValid: boolean) {
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

  createApp() {
    if(this.isDescriptorFormValid && this.isSchemaValid && this.isMappingsValid) {

      const app: Graphql.App = {
        descriptor: this.descriptor,
        schema: this.schema.replace(/\n/g, ''),
        mappings: JSON.parse(this.mappings)
      };

      this.graphqlSvc.createApp(app).subscribe(resp => {
        if(resp.status === 201) {
          this.router.navigate(['apps']);
        }
      });

    }
  }
}
