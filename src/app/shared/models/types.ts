import { Schema } from "./schema";
import { Serializable } from "./serializable";

export namespace Types {

  abstract class Type implements Serializable {

    constructor(
      protected type: string, // type | query | mutation | union | interface
      protected name: string, // actual name of the type, 'Movie'
      protected fields: Schema.Field[]) {}

    serialize() {
      let fields = '';

      this.fields.forEach(field => fields += field.serialize());

      return `${this.type} ${this.name} {` + fields + '} ';
    }
  }

  // type User{ name: String surname: String email: String posts: [Post] }
  // FIELD >  comments(startDate: DateTime = "-9223372036854775808", sort: Int = 1): [Comment]
  export class Object extends Type {

    constructor(protected name: string, protected fields: Schema.Field[]) {
      super('type', name, fields);
    }


  }

  // type Query{users(limit: Int = 0, skip: Int = 0)}
  export class Query extends Type {

    constructor(protected name: string, protected fields: Schema.Field[]) {
      super('Query', name, fields);
    }
  }

}
