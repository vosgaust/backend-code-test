import { GeniallyRepositoryMock } from "../infrastructure/__mocks__/GeniallyRepositoryMock";
import RenameGeniallyService from "../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";

let repository: GeniallyRepositoryMock;
let renameService: RenameGeniallyService;

beforeEach(() => {
  repository = new GeniallyRepositoryMock();
  renameService = new RenameGeniallyService(repository);
});

describe("ReanameGeniallyService", () => {
  it("Should rename an existing genially", async () => {
    const genially = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc",
      name: "name",
      description: "desc"
    };
    repository.onFindReturn(new Genially(genially.id, genially.name, genially.description));

    const renameGeniallyRequest = {
      id: genially.id,
      name: "newName"
    };
    const renamedGenially = await renameService.execute(renameGeniallyRequest);
    repository.assertFindCalledWith(renameGeniallyRequest.id);
    repository.assertDeleteCalledWith(renameGeniallyRequest.id);
    expect(renamedGenially).toBeInstanceOf(Genially);
    expect(renamedGenially).toEqual(expect.objectContaining(renameGeniallyRequest));
  });

  it("Should throw error if genially not found", async () => {
    repository.onFindReturn(undefined);
    const renameGeniallyRequest = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc",
      name: "newName"
    };

    await expect(renameService.execute(renameGeniallyRequest)).rejects.toThrowError();
  });
});