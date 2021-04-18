import { GeniallyRepositoryMock } from "../infrastructure/__mocks__/GeniallyRepositoryMock";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";

let repository: GeniallyRepositoryMock;
let deleteService: DeleteGeniallyService;

beforeEach(() => {
  repository = new GeniallyRepositoryMock();
  deleteService = new DeleteGeniallyService(repository);
});

describe.only("DeleteGeniallyService", () => {
  it("Should delete an existing genially", async () => {
    const genially = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc",
      name: "name",
      description: "desc"
    };
    repository.onFindReturn(new Genially(genially.id, genially.name, genially.description));

    const deleteGeniallyRequest = {
      id: genially.id
    };

    const deletedGenially = await deleteService.execute(deleteGeniallyRequest);
    repository.assertFindCalledWith(deleteGeniallyRequest.id);
    repository.assertDeleteCalledWith(deleteGeniallyRequest.id);
    expect(deletedGenially).toBeInstanceOf(Genially);
    expect(deletedGenially).toEqual(expect.objectContaining(deleteGeniallyRequest));
    expect(deletedGenially.deletedAt).not.toBeUndefined();
  });

  it("Should throw error if genially not found", async () => {
    repository.onFindReturn(undefined);
    const deleteGeniallyRequest = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc"
    };

    await expect(deleteService.execute(deleteGeniallyRequest)).rejects.toThrowError();
  });

  it("Should throw error if genially already deleted", async () => {
    const genially = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc",
      name: "name",
      description: "desc"
    };
    repository.onFindReturn(new Genially(genially.id, genially.name, genially.description));

    const deleteGeniallyRequest = {
      id: genially.id
    };

    const deletedGenially = await deleteService.execute(deleteGeniallyRequest); 
    repository.onFindReturn(deletedGenially);
    await expect(deleteService.execute(deleteGeniallyRequest)).rejects.toThrowError();
  });
});