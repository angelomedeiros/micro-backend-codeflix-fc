import { Category } from ".";
import { IRepository, UuidVo } from "../../shared";

export interface CategoryRepository extends IRepository<Category, UuidVo> {}
