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

describe("Test Get All Phones", () => {
  test("Test GET request for all phones", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });
});