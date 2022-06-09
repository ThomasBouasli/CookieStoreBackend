import { server } from "@Application/Server";
import request from "supertest";

describe("Create User Controller", () => {

  afterEach(() => {
    server.close();
  });

  it("should create a new user", async () => {
    await request(server)
      .post("/api/user")
      .send({
        name: "Test",
        email: "test@supertest.com",
        password: "12345678",
      })
      .expect(201);
  });

  it("should fail to create a new user", async () => {
    await request(server)
      .post("/api/user")
      .send({
        name: "Test",
        email: "test@supertest.com",
        password: "12345678",
      })
      .expect(500);
  });

  it("should fail to create a new user", async () => {
    await request(server)
      .post("/api/user")
      .send({
        name: "Test",
        email: "testsupertest",
        password: "12345678",
      })
      .expect(400);
  });
});
