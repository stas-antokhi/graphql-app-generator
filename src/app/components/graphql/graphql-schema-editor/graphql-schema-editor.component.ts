import { Component, OnInit } from '@angular/core';
import { buildSchema, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { TypeMap } from 'graphql/type/schema';
import { BehaviorSubject } from 'rxjs';
import { MonacoEditorService } from 'src/app/core/services/monaco-editor.service';
import { scalars } from 'src/app/shared/restheart-custom-scalars';

@Component({
  selector: 'app-graphql-schema-editor',
  templateUrl: './graphql-schema-editor.component.html',
  styleUrls: ['./graphql-schema-editor.component.scss']
})
export class GraphqlSchemaEditorComponent implements OnInit {

  exampleSchema = `
    type User {
      id: ObjectId
      name: String
      email: String
    }

    type Query {
      findById(id: ObjectId): User
      findByEmail(email: String): User
    }
  `;

  schema$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  customScalars = scalars.map(scalar => `scalar ${scalar}`).join('\n');

  constructor(private monacoSvc: MonacoEditorService) { }

  ngOnInit(): void {
    console.log(this.customScalars);
  }

  generateSchema(schema: any) {
    const schemaWithCustomScalars = `${this.customScalars} ${schema._value}`;

    const builtSchema: GraphQLSchema = buildSchema(schemaWithCustomScalars);

    const types: TypeMap = builtSchema.getTypeMap();

    // console.log(builtSchema.getType('User'));
    const objTypesWithFields = this.generateObjectsWithFields(types, builtSchema);

    this.monacoSvc.generateJsonSchemaFromTypes(objTypesWithFields)
  }

  // example output: ['User', 'Movie', ...]
  getObjectTypeAsString(types: TypeMap): string[] {

    return Object.keys(types)
    .filter(type => !scalars
                    .concat(['Boolean', 'String', 'Integer'])
                    .some(scalar => type.includes(scalar))
                    && !type.startsWith('__')
    );

  }



  /*
    [
      {
        User: {
          name: {.....},
          email: {.......}
        }
      },
      ...
    ]
  */
  generateObjectsWithFields(types: TypeMap, schema: GraphQLSchema) {
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
