import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { JsonSchema, ModelMarker } from '../shared/models/json-schema';

declare const monaco: any;

export const jsonModelUri = 'inmemory://model/2';

export const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad() {
    monaco.languages.register({ id: language });

    monaco.languages.registerCompletionItemProvider(
      language,
      completionItemProvider
    );
  },
};

const graphqlScalars = [
  'String',
  'Int',
  'Boolean',
  'BsonArray',
  'BsonDocument',
  'DateTime',
  'ObjectId',
  'Timestamp',
  'DateTime',
  'Decimal128',
  'Regex',
];

const language = 'graphql';

const completionItemProvider = {
  triggerCharacters: [':', '['],
  provideCompletionItems: () => {
    const suggestions = graphqlScalars.map((scalar) => ({
      label: scalar,
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: scalar,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    }));
    return { suggestions: suggestions };
  },
};

export const updateSchema = (schema: any) => {
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemaValidation: 'error',
    schemas: [
      schema,
      {
        uri: "http://rh/field-to-field.json",
        schema: {
          type: 'string'
        }
      },
      {
        uri: 'http://rh/field-to-query.json', // id of the second schema
        schema: {
          type: 'object',
          properties: {
            db: {
              type: 'string'
            },
            collection: {
              type: 'string'
            },
            find: {
              type: 'object'
            },
            limit: {
              type: 'object'
            },
            sort: {
              type: 'object'
            },
            skip: {
              type: 'object'
            },
            allowDiskUse: {
              type: 'boolean'
            },
            dataLoader: {
              type: 'object',
              properties: {
                batching: {
                  type: 'boolean'
                },
                caching: {
                  type: 'boolean'
                },
                maxBatchSize: {
                  type: 'integer'
                }
              }
            }
          },
          required: ['db', 'collection', 'find'],
          additionalProperties: false
        }
      },
      {
        uri: 'http://rh/field-to-aggregation.json', // id of the second schema
        schema: {
          type: 'object',
          properties: {
            db: {
              type: 'string'
            },
            collection: {
              type: 'string'
            },
            stages: {
              type: 'array',
              items: {
                type: 'object'
              },
              minItems: 1
            },
            allowDiskUse: {
              type: 'boolean'
            }
          },
          required: ['db', 'collection', 'stages'],
          additionalProperties: false
        }
      }
    ],
  });
};


export const getModelMarkers = (): ModelMarker[] => {
  return monaco.editor.getModelMarkers();
}
