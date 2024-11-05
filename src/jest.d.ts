import { FieldsErrors } from "./shared";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessage: (expected: FieldsErrors) => R;
    }
  }
}
