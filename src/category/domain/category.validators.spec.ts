import { ValidationError } from "../../shared";
import { Category } from "./category.entity";

describe("CategoryValidators", () => {
  it("Create Category with empty name", () => {
    expect(() =>
      Category.create({
        name: "",
      })
    ).containsErrorMessage({
      name: ["name should not be empty"],
    });
  });

  it("Create Category with name length greater than 255 characters", () => {
    expect(() =>
      Category.create({
        name: "a".repeat(256),
      })
    ).containsErrorMessage({
      name: ["name must be shorter than or equal to 255 characters"],
    });
  });

  it("Create Category with name length less than 255 characters", () => {
    expect(() =>
      Category.create({
        name: "a".repeat(255),
      })
    ).not.toThrow();
  });

  it("Create Category with description length greater than 255 characters", () => {
    expect(() =>
      Category.create({
        name: "Category 1",
        description: "a".repeat(256),
      })
    ).not.toThrow();
  });

  it("Create Category with description length less than 255 characters", () => {
    expect(() =>
      Category.create({
        name: "Category 1",
        description: "a".repeat(255),
      })
    ).not.toThrow();
  });
});
