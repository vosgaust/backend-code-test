import Genially from "../../../../../src/contexts/core/genially/domain/Genially";

describe("Genially", () => {
  it("Should return a genially instance", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "name";
    const description = "description";

    const genially = new Genially(id, name, description);
    expect(genially.id).toBe(id);
    expect(genially.name).toBe(name);
    expect(genially.description).toBe(description);
    expect(genially.createdAt).not.toBeNull();
  });

  it("Should fail to return a genially instance if uuid is invalid", () => {
    const id = "wrong-id";
    const name = "name";
    const description = "description";

    //TODO: check correct error type
    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should fail to return a genially instance if name is null", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name: string = null;
    const description = "description";

    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should fail to return a genially instance if name is empty", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "";
    const description = "description";

    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should fail to return a genially instance if name too short", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "aa";
    const description = "description";

    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should fail to return a genially instance if name too long", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "a".repeat(21);
    const description = "description";

    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should fail to return a genially instance if description too long", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "name";
    const description = "a".repeat(126);

    expect(() => new Genially(id, name, description)).toThrowError();
  });

  it("Should change the name and modified date properly", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "name";
    const description = "description";
    const newName = "newName";

    const genially = new Genially(id, name, description);
    expect(genially.modifiedAt).toBeUndefined();
    genially.updateName(newName);
    expect(genially.name).toBe(newName);
    expect(genially.modifiedAt).not.toBeUndefined();
  });

  it("Should delete a genially properly", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "name";
    const description = "description";

    const genially = new Genially(id, name, description);
    expect(genially.deletedAt).toBeUndefined();
    genially.updateDeletedAt();
    expect(genially.deletedAt).not.toBeUndefined();
  });

  it("Should fail to delete a genially twice", () => {
    const id = "e86c3533-1f61-475a-8b19-382789d126fc";
    const name = "name";
    const description = "description";

    const genially = new Genially(id, name, description);
    expect(genially.deletedAt).toBeUndefined();
    genially.updateDeletedAt();
    expect(() => genially.updateDeletedAt()).toThrowError();
  });
});