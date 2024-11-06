import { Entity, ValueObject } from "../..";
import { IRepository } from "../../repository";

export abstract class LocalRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements IRepository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async insertMany(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const index = this.items.findIndex((item) =>
      item.entityId.equals(entity.entityId)
    );

    if (index === -1) {
      throw new Error("Entity not found");
    }

    this.items[index] = entity;
  }

  async delete(id: EntityId): Promise<void> {
    const index = this.items.findIndex((item) => item.entityId.equals(id));

    if (index === -1) {
      throw new Error("Entity not found");
    }

    this.items.splice(index, 1);
  }

  async findById(id: EntityId): Promise<E | null> {
    return this.items.find((item) => item.entityId.equals(id)) || null;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
}
