export namespace Graphql {

  export interface App {
    _id?: {
      $oid: string;
    };
    descriptor: Descriptor
    schema: string;
    mappings: any;
  }

  export interface Descriptor {
    name: string;
    uri: string;
    enabled: boolean;
    description: string;
  }
}
