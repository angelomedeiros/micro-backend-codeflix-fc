import { validateSync } from "class-validator";
import { FieldsErrors, ValidatorFieldsInterface } from ".";

export abstract class ValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors | null = null;
  validatedData: PropsValidated | null = null;

  validate(date: any): boolean {
    const errors = validateSync(date);

    if (errors.length) {
      this.errors = {};

      errors.forEach((error) => {
        this.errors![error.property] = Object.values(error.constraints!);
      });
    } else {
      this.validatedData = date;
    }

    return !errors.length;
  }
}
