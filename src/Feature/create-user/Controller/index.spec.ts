import { server } from "@Application/Server";
import request from "supertest";

describe("Create User Controller", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("should create a new user", async () => {
    const response = await request(server).post("/api/register").send({
      name: "Test",
      email: "test@supertest.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
  });

  it("should fail to create a new user", async () => {
    const response = await request(server).post("/api/register").send({
      name: "Test",
      email: "test@supertest.com",
      password: "12345678",
    });

    expect(response.status).toBe(500);
  });

  it("should fail to create a new user", async () => {
    const response = await request(server).post("/api/register").send({
      name: "Test",
      email: "testsupertest",
      password: "12345678",
    });

    expect(response.status).toBe(400);
  });
});
