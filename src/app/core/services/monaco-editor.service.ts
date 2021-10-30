import { Injectable } from '@angular/core';
import { GraphQLFieldMap } from 'graphql';
import { jsonModelUri, updateSchema } from 'src/app/monaco-config/monaco-graphql-config';
import { JsonSchema } from 'src/app/shared/models/json-schema';

interface TypesWithFields {
  [key: string]: GraphQLFieldMap<any, any>
}

@Injectable({
  providedIn: 'root'
})
export class MonacoEditorService {

  generateJsonSchemaFromTypes(objTypesWithFields: TypesWithFields[]) {

    const reduceToObject = objTypesWithFields.reduce((acc, curr) => Object.assign(acc, curr), {});

    let jsonSchema = {};

    const fieldTypeSchema = {
      objectTypes: [
        { $ref: "http://rh/field-to-query.json" },
        { $ref: "http://rh/field-to-aggregation.json" },
        { $ref: "http://rh/field-to-field.json"}
      ],
      queryType: [
        { $ref: "http://rh/field-to-query.json" },
        { $ref: "http://rh/field-to-aggregation.json" },
      ]
    }

    for(const [type, fields] of Object.entries(reduceToObject)) {
      const objName = type;
      const objFieldsArray = Object.keys(fields);

      let currentTypeSchema: any = {};

      if(objName !== 'Query') {

        currentTypeSchema = {
          [objName]: {
            type: 'object',
            additionalProperties: false,
            properties: objFieldsArray.reduce((acc, currField) => {

              return Object.assign(acc, {
                [currField]: {
                  oneOf: fieldTypeSchema.objectTypes
                }
              })
            }, {})
          }
        }

      } else {

        currentTypeSchema = {
          [objName]: {
            type: 'object',
            additionalProperties: false,
            properties: objFieldsArray.reduce((acc, currField) => {

              return Object.assign(acc, {
                [currField]: {
                  oneOf: fieldTypeSchema.queryType
                }
              })
            }, {})
          }
        }

        currentTypeSchema.Query.required = objFieldsArray;

      }


      Object.assign(jsonSchema, currentTypeSchema);

    }

    let schema = {
      fileMatch: ['inmemory://model/2'],
      uri: 'http://rh/example.json',
      schema: {
        type: 'object',
        properties: jsonSchema,
        additionalProperties: false,
        required: ['Query']
      }
    }


    updateSchema(schema);

  }


}
