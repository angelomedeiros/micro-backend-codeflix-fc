import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Category } from "./category.entity";
import { ValidatorFields } from "../../shared";

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  constructor(props: Category) {
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active;
  }
}

export class CategoryValidator extends ValidatorFields<CategoryRules> {
  validate(category: Category) {
    return super.validate(new CategoryRules(category));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
