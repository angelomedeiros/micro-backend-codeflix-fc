import { FieldsErrors } from "./validator_fields.interface";

export class ValidationError extends Error {
  constructor(
    public error: FieldsErrors,
    message: string = "Validation error"
  ) {
    super(message);
  }

  count() {
    return Object.keys(this.error).length;
  }
}
