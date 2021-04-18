import { GeniallyName } from "./GeniallyName";
import { GeniallyID } from "./GeniallyID";
import { GeniallyDescription } from "./GeniallyDescription";

export default class Genially {
  private _id: GeniallyID;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(id: string, name: string, description?: string) {
    this._id = new GeniallyID(id);
    this._name = new GeniallyName(name);
    this._description = new GeniallyDescription(description);
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id.value;
  }

  get name(): string {
    return this._name.value;
  }

  get description(): string {
    return this._description.value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }
}
