import { FieldsErrors, ValidationError, ValidatorFields } from "../..";

type Expected =
  | {
      validator: ValidatorFields<any>;
      data: any;
    }
  | (() => {});

expect.extend({
  containsErrorMessage(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as ValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

function isValid() {
  return {
    pass: true,
    message: () => "",
  };
}

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () => `
            The validation errors do not contains ${JSON.stringify(received)}.
            Current: ${JSON.stringify(expected)}
        `,
      };
}
