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

describe("Test Get All Processors", () => {
  test("Test GET request for all processors", (done) => {
    request(app)
    .get("/processors")
    .then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  })
})

describe("Test Get All Phones", () => {
  test("Test GET request for all phones", (done) => {
    request(app)
      .get("/phones?processoridphones=abcd")
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });
});