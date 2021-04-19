import { v4 as uuidv4 } from "uuid";

import InMemoryGeniallyRepository from "../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import InMemorySyncEventBus from "../../../src/contexts/shared/infrastructure/InMemorySyncEventBus";
import CreateGeniallyService from "../../../src/contexts/core/genially/application/CreateGeniallyService";
import CreateGeniallyController from "../../../src/api/controllers/CreateGenially";
import { mockRequest, mockResponse } from "jest-mock-req-res";

describe("Create a new genially", () => {
  let repository: InMemoryGeniallyRepository;
  let createGeniallyService: CreateGeniallyService;
  let eventBus: InMemorySyncEventBus;
  let controller: CreateGeniallyController;


  beforeEach(() => {
    repository = new InMemoryGeniallyRepository();
    createGeniallyService = new CreateGeniallyService(repository);
    eventBus = new InMemorySyncEventBus();
    controller = new CreateGeniallyController(createGeniallyService, eventBus); 
  });

  it("Should create a new genially", async () => {
    const request = mockRequest();
    request.body = {id: uuidv4(), name: "name", description: "description"};
    const response = mockResponse();

    await controller.exec(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it("Should fail if invalid name", async () => {
    const request = mockRequest();
    request.body = {"id": uuidv4(), "name": "n", "description": "description"};
    const response = mockResponse();

    await controller.exec(request, response);
  
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("Should fail if id is invalid", async () => {
    const request = mockRequest();
    request.body = {"id": "invalid-uuid", "name": "name", "description": "description"};
    const response = mockResponse();

    await controller.exec(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it("Should fail if description is invalid", async () => {
    const request = mockRequest();
    request.body = {"id": "invalid-uuid", "name": "name", "description": "a".repeat(126)};
    const response = mockResponse();

    await controller.exec(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
  });
});