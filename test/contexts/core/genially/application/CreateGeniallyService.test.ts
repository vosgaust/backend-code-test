import { GeniallyRepositoryMock } from "../infrastructure/__mocks__/GeniallyRepositoryMock";
import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import { EventBusMock } from "../../../shared/infrastructure/__mocks__/EventBusMock";

let repository: GeniallyRepositoryMock;
let service: CreateGeniallyService;
let eventBusMock: EventBusMock;

beforeEach(() => {
  repository = new GeniallyRepositoryMock();
  eventBusMock = new  EventBusMock();
  service = new CreateGeniallyService(repository, eventBusMock);
});

describe("CreateGeniallyService", () => {
  it("Should create a new genially", async () => {
    const createGeniallyRequest = {
      id: "e86c3533-1f61-475a-8b19-382789d126fc",
      name: "name",
      description: "desc"
    };
    const createdGenially = await service.execute(createGeniallyRequest);

    const repositoryArgument = repository.getLastSaveCall();
    expect(repositoryArgument).toBeInstanceOf(Genially);
    expect(repositoryArgument).toEqual(expect.objectContaining(createdGenially));
    expect(repositoryArgument.createdAt).not.toBeNull();
    expect(repositoryArgument.deletedAt).toBeUndefined();

    expect(createdGenially).toBeInstanceOf(Genially);
    expect(createdGenially).toEqual(expect.objectContaining(createGeniallyRequest));

    eventBusMock.assertPublishCalled;
  });
});