import InvalidRequestError from "./InvalidRequest";

export class GeniallyDescription {
  readonly value: string
  private readonly maxChars = 125;

  constructor(value: string) {
    this.checkCorrectValue(value);
    this.value = value;
  }

  private checkCorrectValue(value: string) {
    if(value.length > this.maxChars) {
      throw new InvalidRequestError("description", `should be at max ${this.maxChars} characters long`);
    }
  }
}