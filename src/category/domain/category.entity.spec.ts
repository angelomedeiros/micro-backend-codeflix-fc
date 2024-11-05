import { Category } from ".";
import { UuidVo } from "../../shared";

describe("Category Unit Tests", () => {
  it("should create a category from constructor", () => {
    let category = new Category({
      name: "Category 1",
    });

    expect(category.category_id).toBeInstanceOf(UuidVo);
    expect(category.name).toBe("Category 1");
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it("should create a category from factory method", () => {
    let category = Category.create({
      name: "Category 1",
    });

    expect(category.category_id).toBeInstanceOf(UuidVo);
    expect(category.name).toBe("Category 1");
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it("should change category name", () => {
    let category = new Category({
      name: "Category 1",
    });

    category.changeName("Category 2");

    expect(category.name).toBe("Category 2");
  });

  it("should change category description", () => {
    let category = new Category({
      name: "Category 1",
    });

    category.changeDescription("Description 1");

    expect(category.description).toBe("Description 1");
  });

  it("should activate category", () => {
    let category = new Category({
      name: "Category 1",
    });

    category.deactivate();
    category.activate();

    expect(category.is_active).toBe(true);
  });

  it("should deactivate category", () => {
    let category = new Category({
      name: "Category 1",
    });

    category.activate();
    category.deactivate();

    expect(category.is_active).toBe(false);
  });

  it("should return json object", () => {
    let category = new Category({
      name: "Category 1",
    });

    let json = category.toJSON();

    expect(json.category_id).toBeDefined();
    expect(json.name).toBe("Category 1");
    expect(json.description).toBeNull();
    expect(json.is_active).toBe(true);
    expect(json.created_at).toBeInstanceOf(Date);
  });

  describe("should create an id when", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new UuidVo() },
    ];

    it.each(arrange)("category_id is %j", ({ category_id }) => {
      let category = new Category({
        name: "Category 1",
        category_id: category_id,
      });

      expect(category.category_id).toBeInstanceOf(UuidVo);
    });
  });

  it("should return json object with custom date", () => {
    let category = new Category({
      name: "Category 1",
      created_at: new Date("2021-01-01"),
    });

    let json = category.toJSON();

    expect(typeof json.category_id).toBe("string");
    expect(json.name).toBe("Category 1");
    expect(json.description).toBeNull();
    expect(json.is_active).toBe(true);
    expect(json.created_at.toISOString()).toBe("2021-01-01T00:00:00.000Z");
  });

  it("should return json object with custom description", () => {
    let category = new Category({
      name: "Category 1",
      description: "Description 1",
    });

    let json = category.toJSON();

    expect(typeof json.category_id).toBe("string");
    expect(json.name).toBe("Category 1");
    expect(json.description).toBe("Description 1");
    expect(json.is_active).toBe(true);
    expect(json.created_at).toBeInstanceOf(Date);
  });

  it("should return json object with custom is_active", () => {
    let category = new Category({
      name: "Category 1",
      is_active: false,
    });

    let json = category.toJSON();

    expect(json.category_id).toBeDefined();
    expect(json.name).toBe("Category 1");
    expect(json.description).toBeNull();
    expect(json.is_active).toBe(false);
    expect(json.created_at).toBeInstanceOf(Date);
  });
});
