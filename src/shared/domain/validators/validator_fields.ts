import { validateSync } from "class-validator";
import { FieldsErrors, ValidatorFieldsInterface } from ".";

export abstract class ValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = {};
  validatedData: PropsValidated | null = null;

  validate(date: any): boolean {
    const errors = validateSync(date);

    if (errors.length) {
      this.errors = {};

      errors.forEach((error) => {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints!);
      });
    } else {
      this.validatedData = date;
    }

    return !Object.keys(this.errors).length;
  }
}
