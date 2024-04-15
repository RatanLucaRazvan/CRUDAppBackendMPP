import request from "supertest";
import app from "../index";
import { describe } from "@jest/globals";
import createObjects from "./createObjects";

beforeAll(() => {
  createObjects();
});
afterAll(() => {
  app.close();
})

describe("Test Get Phone By Id", () => {
  test("Test Get wuth good Id", (done) => {
    request(app)
      .get("/phones/2")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Samsung Galaxy S3");
        expect(response.body.price).toBe(1000);
        expect(response.body.prodYear).toBe(2010);
        expect(response.body.description).toBe("Good Phone");
        done();
      });
  });
  test("Test Get with bad Id", (done) => {
    request(app)
      .get("/phones/10")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Phone does not exist");
        done();
      });
  });
});