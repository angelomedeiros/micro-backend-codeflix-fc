import { UuidVo } from "../../shared";

export type CategoryConstructorProps = {
  category_id?: UuidVo | null | undefined;
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

export class Category {
  category_id?: UuidVo | null | undefined;
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

  static create(props: CategoryCreateCommand): Category {
    return new Category({
      category_id: new UuidVo(),
      name: props.name,
      description: props.description,
      is_active: props.is_active,
      created_at: new Date(),
    });
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
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
