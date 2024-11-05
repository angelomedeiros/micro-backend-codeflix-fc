import { InvalidUuidError, UuidVo } from ".";

describe("Uuid Value Object - Unit Tests", () => {
  it("should throw error when uuid is invalid", () => {
    expect(() => new UuidVo("abcde")).toThrow(InvalidUuidError);
  });

  it("should create a new uuid", () => {
    const uuid = new UuidVo();

    expect(uuid.id).toBeDefined();
  });

  it("should create a new uuid with the provided id", () => {
    const uuid = "123e4567-e89b-12d3-a456-426614174000";
    const uuidVo = new UuidVo(uuid);

    expect(uuidVo.id).toBe(uuid);
  });
});
