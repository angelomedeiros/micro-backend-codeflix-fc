import { ValueObject } from "..";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(
    readonly value: {
      name: string;
      age: number;
      adress: {
        street: string;
        number: number;
      };
    }
  ) {
    super();
  }
}

describe("ValueObject Unit Tests", () => {
  it("should be equals - Simple Object", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");

    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it("should be equals - Complex Object", () => {
    const valueObject1 = new ComplexValueObject({
      name: "test",
      age: 10,
      adress: {
        street: "test",
        number: 10,
      },
    });
    const valueObject2 = new ComplexValueObject({
      name: "test",
      age: 10,
      adress: {
        street: "test",
        number: 10,
      },
    });

    expect(valueObject1.equals(valueObject2)).toBe(true);
  });

  it("should not be equals - Simple Object", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test2");

    expect(valueObject1.equals(valueObject2)).toBe(false);
  });

  it("should not be equals - Complex Object", () => {
    const valueObject1 = new ComplexValueObject({
      name: "test",
      age: 10,
      adress: {
        street: "test",
        number: 10,
      },
    });
    const valueObject2 = new ComplexValueObject({
      name: "test",
      age: 10,
      adress: {
        street: "test",
        number: 11,
      },
    });

    expect(valueObject1.equals(valueObject2)).toBe(false);
  });
});
