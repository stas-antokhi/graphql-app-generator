
export namespace Graphql {

  export interface App {
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
