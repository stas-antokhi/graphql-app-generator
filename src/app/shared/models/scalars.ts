import { Serializable } from "./serializable";

export namespace Scalars {

  export abstract class Scalar implements Serializable {

    constructor(protected name: string) {
      this.name = name;
    }

    serialize() {
      return this.name;
    }
  }

  export class Int extends Scalar {
    constructor() {
      super('Int');
    }
  }


  export class String extends Scalar {
    constructor() {
      super('String');
    }
  }

  export class DateTime extends Scalar {
    constructor() {
      super('DateTime');
    }
  }


  export class ObjectId extends Scalar {
    constructor() {
      super('ObjectId');
    }
  }


  export class List<T extends Scalar> {
    constructor(private listType: T, private notNull: boolean = false) { }

    serialize() {
      const isNotNull = this.notNull === true ? '!' : '';
      return `[${this.listType.serialize()}]${isNotNull}`;
    }
  }

}
