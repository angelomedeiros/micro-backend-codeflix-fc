import { ValueObject } from "..";

export abstract class Entity {
  abstract get entityId(): ValueObject;
  abstract toJSON(): any;
}
