import validate from "uuid-validate";

export class GeniallyID {
  readonly value: string

  constructor(value: string) {
    this.checkValidUuid(value);
    this.value = value;
  }

  private checkValidUuid(value: string): void {
    if(!validate(value)) {
      //TODO: define this error
      throw new Error(`${value} is not a valid id`);
    }
  }
}