import { v4 as uuidv4 } from "uuid";

import InMemorySyncEventBus from "../../../src/contexts/shared/infrastructure/InMemorySyncEventBus";
import InMemoryGeniallyRepository from "../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../src/contexts/core/genially/application/CreateGeniallyService";
import CreateGeniallyController from "../../../src/api/controllers/CreateGenially";
import RenameGeniallyService from "../../../src/contexts/core/genially/application/RenameGeniallyService";
import { UpdateGeniallyController } from "../../../src/api/controllers/UpdateGenially";
import { mockRequest, mockResponse } from "jest-mock-req-res";

describe("Update a new genially", () => {
  let repository: InMemoryGeniallyRepository;
  let eventBus: InMemorySyncEventBus;
  let renameGeniallyService: RenameGeniallyService;
  let createGeniallyService: CreateGeniallyService;
  let createController: CreateGeniallyController;
  let updateController: UpdateGeniallyController;

  beforeEach(() => {
    repository = new InMemoryGeniallyRepository();
    eventBus = new InMemorySyncEventBus();
    renameGeniallyService = new RenameGeniallyService(repository);
    createGeniallyService = new CreateGeniallyService(repository);
    updateController = new UpdateGeniallyController(renameGeniallyService); 
    createController = new CreateGeniallyController(createGeniallyService, eventBus); 
  });

  it("Should rename a new genially", async () => {
    const ID = uuidv4();
    const createRequest = mockRequest();
    const createResponse = mockResponse();
    createRequest.body = { id: ID, name: "name", description: "description" };

    await createController.exec(createRequest, createResponse);
    expect(createResponse.status).toHaveBeenLastCalledWith(200);

    const updateRequest = mockRequest();
    updateRequest.body = { id: ID, "name": "newName" };
    const updateResponse = mockResponse();
  
    await updateController.exec(updateRequest, updateResponse);
    expect(updateResponse.status).toHaveBeenCalledWith(200);
  });

  it("Should fail if invalid new name", async () => {
    const ID = uuidv4();
    const createRequest = mockRequest();
    const createResponse = mockResponse();
    createRequest.body = { id: ID, name: "name", description: "description" };

    await createController.exec(createRequest, createResponse);
    expect(createResponse.status).toHaveBeenLastCalledWith(200);

    const updateRequest = mockRequest();
    updateRequest.body = { id: ID, "name": "n" };
    const updateResponse = mockResponse();
  
    await updateController.exec(updateRequest, updateResponse);
    expect(updateResponse.status).toHaveBeenCalledWith(400);
  });

  it("Should fail if genially doesn't exist", async () => {
    const updateRequest = mockRequest();
    updateRequest.body = { id: uuidv4(), "name": "newName" };
    const updateResponse = mockResponse();
  
    await updateController.exec(updateRequest, updateResponse);
    expect(updateResponse.status).toHaveBeenCalledWith(404);
  });
});