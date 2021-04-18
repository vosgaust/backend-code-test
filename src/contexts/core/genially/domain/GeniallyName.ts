export class GeniallyName {
  readonly value: string
  private readonly minChars = 3;
  private readonly maxChars = 20;

  constructor(value: string) {
    this.checkCorrectValue(value);
    this.value = value;
  }

  private checkCorrectValue(value: string) {
    if(!value) {
      throw new Error("Genially name can't be empty");
    }
    if(value.length < this.minChars) {
      throw new Error(`Genially name should be at least ${this.minChars} characters long`);
    }
    if(value.length > this.maxChars) {
      throw new Error(`Genially name should be at max ${this.maxChars} characters long`);
    }
  }
}