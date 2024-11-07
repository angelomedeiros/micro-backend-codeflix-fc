import { LocalRepository, UuidVo } from "../../../shared";
import { Category } from "../../domain";

export class CategoryLocalRepository extends LocalRepository<Category, UuidVo> {
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
