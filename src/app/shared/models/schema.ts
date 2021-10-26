import { Scalars } from "./scalars";
import { Serializable } from "./serializable";
import { Types } from "./types";

export namespace Schema {

  export interface Schema {
    objects: Types.Object[],
    query: Types.Query[]
  }


  export class Field implements Serializable {

    constructor(
      private name: string,
      private returnType: Scalars.Scalar,
      // nested field, ex: comment(limit: Int): [Comment] limit: Int is and argument
      private args?: Field[],
      private defaultValue?: string | number,
      private notNull: boolean = false) {}

    serialize() {
      let field = '';

      if(this.args && this.args.length !== 0) {

        let nestedFields = '';
        this.args.forEach(field => nestedFields += field.serialize())
        field = `${this.name}(${nestedFields}): ${this.returnType.serialize()} `

      } else {

        const defaultVal = this.defaultValue === undefined ? '' : `= ${this.defaultValue}`;
        const isNotNull = this.notNull === true ? '!' : '';
        field = `${this.name}: ${this.returnType.serialize()}${isNotNull} ${defaultVal}`

      }

      return field;
    }

  }

}
