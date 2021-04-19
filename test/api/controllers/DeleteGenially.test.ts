import { v4 as uuidv4 } from "uuid";

import InMemorySyncEventBus from "../../../src/contexts/shared/infrastructure/InMemorySyncEventBus";
import InMemoryGeniallyRepository from "../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import CreateGeniallyService from "../../../src/contexts/core/genially/application/CreateGeniallyService";
import CreateGeniallyController from "../../../src/api/controllers/CreateGenially";
import DeleteGeniallyService from "../../../src/contexts/core/genially/application/DeleteGeniallyService";
import { DeleteGeniallyController } from "../../../src/api/controllers/DeleteGenially";
import { mockRequest, mockResponse } from "jest-mock-req-res";

describe("Delete a new genially", () => {
  let repository: InMemoryGeniallyRepository;
  let eventBus: InMemorySyncEventBus;
  let deleteGeniallyService: DeleteGeniallyService;
  let createGeniallyService: CreateGeniallyService;
  let createController: CreateGeniallyController;
  let deleteController: DeleteGeniallyController;


  beforeEach(() => {
    repository = new InMemoryGeniallyRepository();
    eventBus = new InMemorySyncEventBus();
    deleteGeniallyService = new DeleteGeniallyService(repository);
    createGeniallyService = new CreateGeniallyService(repository, eventBus);
    deleteController = new DeleteGeniallyController(deleteGeniallyService); 
    createController = new CreateGeniallyController(createGeniallyService); 
  });

  it("Should delete a new Denially", async () => {
    const ID = uuidv4();
    const createRequest = mockRequest();
    const createResponse = mockResponse();
    createRequest.body = { id: ID, name: "name", description: "description" };

    await createController.exec(createRequest, createResponse);
    expect(createResponse.status).toHaveBeenLastCalledWith(200);

    const deleteRequest = mockRequest();
    deleteRequest.body = { id: ID };
    const deleteResponse = mockResponse();

    await deleteController.exec(deleteRequest, deleteResponse);
    expect(deleteResponse.status).toHaveBeenCalledWith(200);
  });

  it("Should fail if genially doesn't exist", async () => {
    const deleteRequest = mockRequest();
    deleteRequest.body = { id: uuidv4() };
    const deleteResponse = mockResponse();

    await deleteController.exec(deleteRequest, deleteResponse);

    expect(deleteResponse.status).toHaveBeenCalledWith(404);
  });

  it("Should fail if already deleted", async () => {
    const ID = uuidv4();
    const createRequest = mockRequest();
    const createResponse = mockResponse();
    createRequest.body = { id: ID, name: "name", description: "description" };

    await createController.exec(createRequest, createResponse);
    expect(createResponse.status).toHaveBeenLastCalledWith(200);

    const deleteRequest = mockRequest();
    deleteRequest.body = { id: ID };
    const deleteResponse = mockResponse();

    await deleteController.exec(deleteRequest, deleteResponse);
    expect(deleteResponse.status).toHaveBeenCalledWith(200);

    await deleteController.exec(deleteRequest, deleteResponse);
    expect(deleteResponse.status).toHaveBeenCalledWith(400);
  });
});