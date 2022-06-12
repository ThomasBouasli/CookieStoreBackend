import { server } from "@Application/Server";
import supertest from "supertest";

describe("Log In Feature", () => {
  beforeAll(async () => {
    await supertest(server).post("/api/register").send({
      name: "Log In Test",
      email: "login@controller.com",
      password: "logincontroller",
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return a token", async () => {
    const response = await supertest(server).post("/api/login").send({
      email: "login@controller.com",
      password: "logincontroller",
    });    
    expect(response.status).toBe(200);
  });
});
