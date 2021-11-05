import { Injectable } from '@angular/core';
import { GraphQLFieldMap } from 'graphql';
import { updateSchema } from 'src/app/monaco-config/monaco-editor-config';

interface TypesWithFields {
  [key: string]: GraphQLFieldMap<any, any>
}

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService {

  /*
    field -> field
    field -> query
    field -> aggregation
    https://restheart.org/docs/graphql/#mappings
   */
  private typesOfMappings = {
    Obj: [
      { $ref: "http://rh/field-to-query.json" },
      { $ref: "http://rh/field-to-aggregation.json" },
      { $ref: "http://rh/field-to-field.json"}
    ],
    Query: [
      { $ref: "http://rh/field-to-query.json" },
      { $ref: "http://rh/field-to-aggregation.json" },
    ]
  }

  /**
   * Given an array of [type: fieldsArray] generate a JSON schema for mappings validation.
   * @param objTypesWithFields
   */
  generateJsonSchemaFromTypes(objTypesWithFields: TypesWithFields[]) {

    const reducedArrayToObj = objTypesWithFields.reduce((acc, curr) => Object.assign(acc, curr), {});

    let mappingsSchema = {};

    for(const [type, fields] of Object.entries(reducedArrayToObj)) {

      const currentTypeName: string = type;
      const currentTypeFields: string[] = Object.keys(fields);

      let currentTypeJsonSchema: any = {
        [currentTypeName]: {
          type: 'object',
          additionalProperties: false,
          properties: this.reduceFieldsArrayToObject(
            currentTypeFields,
            currentTypeName === 'Query' ? 'Query' : 'Obj'
          )
        }
      }

      // If schema has Query type, all fields must be defined in mappings!
      if(currentTypeName === 'Query') {
          currentTypeJsonSchema.Query.required = currentTypeFields;
      }

      Object.assign(mappingsSchema, currentTypeJsonSchema);

    }

    let schema = {
      fileMatch: ['inmemory://model/2'],
      uri: 'http://rh/example.json',
      schema: {
        type: 'object',
        properties: mappingsSchema,
        additionalProperties: false,
        required: ['Query']
      }
    }

    updateSchema(schema);
  }

  private reduceFieldsArrayToObject(fieldsArray: string[], objectType: 'Query' | 'Obj') {
    return fieldsArray.reduce((acc, curr) => {
      return Object.assign(acc, {
        [curr]: {
          oneOf: this.typesOfMappings[objectType]
        }
      })
    }, {});
  }

}
