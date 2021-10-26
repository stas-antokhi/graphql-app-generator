export interface Serializable {
  // transform from json to graphlq
  serialize(): string;

  // from graphql to json
}

