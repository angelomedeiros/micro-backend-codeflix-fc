import { ValueObject } from ".";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UuidVo extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validateId();
  }

  private validateId() {
    const isValid = uuidValidate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }

    return uuidValidate(this.id);
  }

  toString(): string {
    return this.id;
  }
}

export class InvalidUuidError extends Error {
  constructor() {
    super("Invalid UUID, ID must be a valid UUID.");
    this.name = "InvalidUuidError";
  }
}
