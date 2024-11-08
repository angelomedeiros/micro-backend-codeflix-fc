import { Entity, UuidVo, ValidationError, ValueObject } from "../../shared";
import validate from "./../../../node_modules/uuid/dist/cjs-browser/validate.d";
import { CategoryValidatorFactory } from "./category.validators";

export type CategoryConstructorProps = {
  category_id?: UuidVo;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class Category implements Entity {
  category_id: UuidVo;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    this.category_id = props.category_id ?? new UuidVo();
    this.name = props.name;
    this.description = props.description ?? null;
    this.created_at = props.created_at ?? new Date();
    this.is_active = props.is_active ?? true;
  }

  get entityId(): ValueObject {
    return this.category_id!;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  static validate(category: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(category);

    if (!isValid) {
      throw new ValidationError(validator.errors!);
    }
  }

  toJSON() {
    return {
      category_id: this.category_id?.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
