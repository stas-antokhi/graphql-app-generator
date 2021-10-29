import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  printSchema,
  Thunk,
} from 'graphql';


@Component({
  selector: 'app-graphql-schema',
  templateUrl: './graphql-schema.component.html',
  styleUrls: ['./graphql-schema.component.scss'],
})
export class GraphqlSchemaComponent implements OnInit {
  queryFields: Thunk<GraphQLFieldConfigMap<any, any>> = {};

  schemaForm!: FormGroup;
  // key is the type name
  objectTypesFieldsMap: Map<string, Thunk<GraphQLFieldConfigMap<any, any>>> = new Map();

  scalars: Map<string, GraphQLScalarType> = new Map();


  constructor(private fb: FormBuilder, public schemaPreviewDialog: MatDialog) {}

  ngOnInit(): void {

    this.scalars.set('String', GraphQLString);
    this.scalars.set('Int', GraphQLInt);

    this.schemaForm = this.fb.group({
      objects: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          fields: this.fb.array([], Validators.required)
        })
      ], Validators.required),

      queryFields: this.fb.array([]),
    });

  }

  schemaObject(index: number): FormGroup {
    return this.schemaObjectsArray.at(index) as FormGroup;
  }

  get schemaObjectsArray(): FormArray {
    return this.schemaForm.get('objects') as FormArray;
  }

  addObjectType(): void {
    this.schemaObjectsArray.push(
      this.fb.group({
        name: ['', Validators.required],
        fields: this.fb.array([
          this.fb.group({
            name: ['', Validators.required],
            type: ['String', Validators.required]
          })
        ])
      })
    );
  }


  objectField(objectIndex: number, fieldIndex: number): FormGroup {
    return this.objectFieldFormArray(objectIndex).at(fieldIndex) as FormGroup
  }

  objectFieldFormArray(objectIndex: number): FormArray {
    return (((this.schemaForm.get('objects') as FormArray).controls)[objectIndex] as FormGroup).controls['fields'] as FormArray;
  }


  dummyPushField(target: string) {
    if (this.objectTypesFieldsMap.has(target)) {
      const objFields = this.objectTypesFieldsMap.get(target);
      this.objectTypesFieldsMap.set(
        target,
        Object.assign(objFields, {
          example: {
            type: GraphQLString
          }
        })
      );
    }
  }

  pushField(
    targetObject: string,
    field: Thunk<GraphQLFieldConfigMap<any, any>>
  ) {
    if (this.objectTypesFieldsMap.has(targetObject)) {
      const objFields = this.objectTypesFieldsMap.get(targetObject);
      this.objectTypesFieldsMap.set(
        targetObject,
        Object.assign(objFields, field)
      );
    }
  }

  printCurrentMap() {
    console.log(this.objectTypesFieldsMap);
    console.log(this.generateSDLSchema())
  }


  addFieldToObjectFieldArray(objectId: number): void {
    const field = this.fb.group({
      name: ['', Validators.required],
      type: ['String', Validators.required],
    });
    this.objectFieldFormArray(objectId).push(field);
  }


  printFormValue() {

    const objectTypes: {fields: {name: string, type: string}[] ; name: string}[] = this.schemaForm.value.objects;

    objectTypes.forEach(obj => {

      const objFields: Thunk<GraphQLFieldConfigMap<any, any>> = obj.fields.reduce((prev, curr) => {
        return Object.assign({
          [curr.name]: {
            type: this.scalars.get(curr.type)
          }
        }, prev)
      }, {});

      this.objectTypesFieldsMap.set(obj.name, objFields);
    });

  }

  createObject(
    name: string,
    fields: Thunk<GraphQLFieldConfigMap<any, any>> = {}
  ): GraphQLObjectType {
    return new GraphQLObjectType({
      name,
      fields,
    });
  }

  generateSDLSchema(): string {
    const objects = [];
    for (const [obj, fields] of this.objectTypesFieldsMap.entries()) {
      objects.push(this.createObject(obj, fields));
    }

    if (this.objectTypesFieldsMap.has('Query')) {
      return printSchema(
        new GraphQLSchema({
          types: objects,
          query: this.createObject(
            'Query',
            this.objectTypesFieldsMap.get('Query') ?? {}
          ),
        })
      );
    } else {
      return printSchema(
        new GraphQLSchema({
          types: objects,
        })
      );
    }
  }

  openPreview(): void {
    this.schemaPreviewDialog.open(SchemaPreviewDialogComponent, {
      data: {
        schema: this.generateSDLSchema()
      }
    })
  }
}

@Component({
  selector: 'schema-preview-dialog',
  template: `
    <h2 mat-dialog-title>Schema preview</h2>

    <mat-dialog-content class="py-4">
      <pre>{{data.schema}}</pre>
    </mat-dialog-content>

    <mat-dialog-actions class="justify-center">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class SchemaPreviewDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {schema: string}) {}

}
