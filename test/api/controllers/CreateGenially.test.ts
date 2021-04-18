import request from "supertest";
import server from "../../../src/api/server";
import { v4 as uuidv4 } from "uuid";

describe("Create a new genially", () => {
  afterEach(() => {
    server.close();
  });
  beforeEach(() => {
    server.close();
  });
  beforeAll(() => {
    server.close();
  });

  it("Should create a new genially", async () => {
    const response = await request(server)
    .post("/genially")
    .send({
      "id": uuidv4(),
      "name": "name",
      "description": "description"
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("Should fail if invalid name", async () => {
    const response = await request(server)
    .post("/genially")
    .send({
      "id": uuidv4(),
      "name": "n",
      "description": "description"
    });
    expect(response.status).toBe(400);
  });

  it("Should fail if id is invalid", async () => {
    const response = await request(server)
    .post("/genially")
    .send({
      "id": "invalid-uuid",
      "name": "name",
      "description": "description"
    });
    expect(response.status).toBe(400);
  });

  it("Should fail if description is invalid", async () => {
    const response = await request(server)
    .post("/genially")
    .send({
      "id": "invalid-uuid",
      "name": "name",
      "description": "a".repeat(126)
    });
    expect(response.status).toBe(400);
  });
});