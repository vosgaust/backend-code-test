import {validate as uuidValidate} from "uuid";
import InvalidRequestError from "./InvalidRequest";

export class GeniallyID {
  readonly value: string

  constructor(value: string) {
    this.checkValidUuid(value);
    this.value = value;
  }

  private checkValidUuid(value: string): void {
    if (!uuidValidate(value)) {
      throw new InvalidRequestError("id", `${value} is not a valid uuid`);
    }
  }
}