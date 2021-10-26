import { Schema } from "./schema";

export namespace Graphql {


  export interface App {
    _id: {
      $oid: string
    },
    descriptor: Descriptor;
    schema: Schema.Schema
    mappings?: Mapping;
  }



  export interface Descriptor {
    description: string;
    uri: string;
    name: string;
    enabled: boolean
  }



  export interface Mapping {

  }


}
