import { LocalRepository } from "..";
import { Entity, NotFoundError, UuidVo, ValueObject } from "../../..";

type StubEntityConstructor = {
  entityId?: UuidVo;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entityId: UuidVo;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entityId = props.entityId || new UuidVo();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      id: this.entityId.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubLocalRepository extends LocalRepository<StubEntity, UuidVo> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("LocalRepository Unit Tests", () => {
  let repository: StubLocalRepository;

  beforeEach(() => {
    repository = new StubLocalRepository();
  });

  it("should insert an entity", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    await repository.insert(entity);

    expect(repository.items).toContain(entity);
  });

  it("should insert many entities", async () => {
    const entities = [
      new StubEntity({
        entityId: new UuidVo(),
        name: "Stub Entity 1",
        price: 100,
      }),
      new StubEntity({
        entityId: new UuidVo(),
        name: "Stub Entity 2",
        price: 200,
      }),
    ];

    await repository.insertMany(entities);

    expect(repository.items).toContain(entities[0]);
    expect(repository.items).toContain(entities[1]);
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    await repository.insert(entity);

    const updatedEntity = new StubEntity({
      entityId: entity.entityId,
      name: "Updated Stub Entity",
      price: 200,
    });

    await repository.update(updatedEntity);

    expect(repository.items).toContain(updatedEntity);
    expect(repository.items).not.toContain(entity);
    expect(repository.items.length).toBe(1);
  });

  it("should throw an error when updating an entity that does not exist", async () => {
    const entity = new StubEntity({
      name: "Stub Entity",
      price: 100,
    });

    await expect(repository.update(entity)).rejects.toThrow(NotFoundError);

    expect(repository.items).not.toContain(entity);
    expect(repository.items.length).toBe(0);
  });

  it("should delete an entity", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    await repository.insert(entity);

    await repository.delete(entity.entityId);

    expect(repository.items).not.toContain(entity);

    expect(repository.items.length).toBe(0);
  });

  it("should throw an error when deleting an entity that does not exist", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    await expect(repository.delete(entity.entityId)).rejects.toThrow(
      new NotFoundError(entity.entityId, StubEntity)
    );

    expect(repository.items).not.toContain(entity);
    expect(repository.items.length).toBe(0);
  });

  it("should find an entity by id", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    await repository.insert(entity);

    const foundEntity = await repository.findById(entity.entityId);

    expect(foundEntity).toEqual(entity);

    expect(repository.items.length).toBe(1);
  });

  it("should return null when finding an entity by id that does not exist", async () => {
    const entity = new StubEntity({
      entityId: new UuidVo(),
      name: "Stub Entity",
      price: 100,
    });

    const foundEntity = await repository.findById(entity.entityId);

    expect(foundEntity).toBeNull();

    expect(repository.items.length).toBe(0);
  });

  it("should find all entities", async () => {
    const entities = [
      new StubEntity({
        entityId: new UuidVo(),
        name: "Stub Entity 1",
        price: 100,
      }),
      new StubEntity({
        entityId: new UuidVo(),
        name: "Stub Entity 2",
        price: 200,
      }),

      new StubEntity({
        entityId: new UuidVo(),
        name: "Stub Entity 3",
        price: 300,
      }),
    ];

    await repository.insertMany(entities);

    const foundEntities = await repository.findAll();

    expect(foundEntities).toEqual(entities);

    expect(repository.items.length).toBe(3);
  });

  it("should return an empty array when finding all entities and none exist", async () => {
    const foundEntities = await repository.findAll();

    expect(foundEntities).toEqual([]);

    expect(repository.items.length).toBe(0);
  });
});
