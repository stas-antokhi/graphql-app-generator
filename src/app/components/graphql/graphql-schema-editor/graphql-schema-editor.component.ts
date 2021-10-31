import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { buildSchema, GraphQLError, GraphQLFormattedError, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { TypeMap } from 'graphql/type/schema';
import { EditorComponent } from 'ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';
import { MonacoEditorService } from 'src/app/core/services/monaco-editor.service';
import { scalars } from 'src/app/shared/restheart-custom-scalars';

@Component({
  selector: 'app-graphql-schema-editor',
  templateUrl: './graphql-schema-editor.component.html',
  styleUrls: ['./graphql-schema-editor.component.scss']
})
export class GraphqlSchemaEditorComponent implements OnInit {

  _schema: string =`type User {
  id: ObjectId
  name: String
  email: String
}

type Query {
  findById(id: ObjectId): User
  findByEmail(email: String): User
}
  `;

  @ViewChild('schemaBtn') schemaBtn!: MatButton;
  @ViewChild('editor') editor!: EditorComponent;

  @Output() isSchemaValid = new EventEmitter<boolean>(false);

  @Output() schema = new EventEmitter<string>();

  isNextStepDisabled = true;

  customScalars = scalars.map(scalar => `scalar ${scalar}`).join('\n');

  constructor(
    private monacoSvc: MonacoEditorService,
    private schemaErrorDialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }



  onModelChange() {
    this.isNextStepDisabled = true;
    this.isSchemaValid.emit(false);
    this.schemaBtn.color = "primary";
  }

  ngOnInit(): void {
  }

  verifyAndGenerateSchema() {
    const schemaWithCustomScalars = `${this.customScalars} ${this._schema}`;

    try {
      const builtSchema: GraphQLSchema  = buildSchema(schemaWithCustomScalars);

      this.isSchemaValid.emit(true);
      this.isNextStepDisabled = false;
      this.schemaBtn.color = "primary";
      this.snackbar.open('Your schema has no errors!', 'Close', {duration: 3000});
      this.schema.emit(this._schema);

      const types: TypeMap = builtSchema.getTypeMap();

      // console.log(builtSchema.getType('User'));
      const objTypesWithFields = this.generateObjectsWithFields(types, builtSchema);

      this.monacoSvc.generateJsonSchemaFromTypes(objTypesWithFields)

    } catch(err: any) {

      this.isSchemaValid.emit(false);
      this.isNextStepDisabled = true;
      this.schemaBtn.color = "warn";

      if(err instanceof GraphQLError) {
        this.openSchemaErrorDialog((err as GraphQLFormattedError));
      }
    }
  }


  private openSchemaErrorDialog(error: any) {
    this.schemaErrorDialog.open(SchemaParseErrorDialog, {
      data: {
        error
      }
    })
  }

  /**
   * filter out native types that start with __ and all scalars
   *
  */
  private getObjectTypeAsString(types: TypeMap): string[] {

    return Object.keys(types)
    .filter(type => !scalars
                    .concat(['Boolean', 'String', 'Integer'])
                    .some(scalar => type.includes(scalar))
                    && !type.startsWith('__')
    );

  }



  private generateObjectsWithFields(types: TypeMap, schema: GraphQLSchema) {
    return this.getObjectTypeAsString(types)
        .filter(typeName => schema.getType(typeName) instanceof GraphQLObjectType)
        .map(obj => {
          const objType = schema.getType(obj) as GraphQLObjectType;

          return {
            [obj]: objType.getFields()
          }
        });
  }


}

@Component({
  selector: 'app-schema-parse-error',
  styles: [],
  template: `
    <h1>We found some errors while trying to parse your schema</h1>
    <div>
      <pre>{{data.error}}</pre>
    </div>
    <div class="flex justify-center">
      <button class="bg-primary-500 px-6 py-2 text-gray-200 rounded shadow" (click)="closeDialog()">Ok</button>
    </div>

  `
})
export class SchemaParseErrorDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {error: string},
    public dialogRef: MatDialogRef<SchemaParseErrorDialog>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
