import request from "supertest";
import server from "../../../src/api/server";
import { v4 as uuidv4 } from "uuid";

describe("Delete a new genially", () => {
  afterEach(() => {
    server.close();
  });
  beforeEach(() => {
    server.close();
  });
  beforeAll(() => {
    server.close();
  });

  it("Should delete a new genially", async () => {
    const ID = uuidv4();
    let response = await request(server)
    .post("/genially")
    .send({
      "id": ID,
      "name": "name",
      "description": "description"
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });

    response = await request(server)
    .delete("/genially")
    .send({
      "id": ID
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("Should fail if genially doesn't exist", async () => {
    const response = await request(server)
    .delete("/genially")
    .send({
      "id": uuidv4()
    });
    expect(response.status).toBe(404);
  });

  it("Should fail if already deleted", async () => {
    const ID = uuidv4();
    let response = await request(server)
    .post("/genially")
    .send({
      "id": ID,
      "name": "name",
      "description": "description"
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });

    response = await request(server)
    .delete("/genially")
    .send({
      "id": ID
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });

    response = await request(server)
    .delete("/genially")
    .send({
      "id": ID
    });
    expect(response.status).toBe(400);
  });
});