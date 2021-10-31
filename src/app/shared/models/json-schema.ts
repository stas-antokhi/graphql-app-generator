export interface JsonSchema {
  schema: any;
  uri?: string
  fileMatch?: [];
}

export interface ModelMarker {
  code: any | undefined;
  endColumn: number;
  endLineNumber: number;
  message: string;
  owner: string;
  relatedInformation: undefined | any;
  resource: any;
  severity: number;
  source: undefined | any;
  startColumn: number;
  startLineNumber: number;
  tags: undefined | any;
}
