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

describe("Test Add Phone", () => {
  test("Test Add Phone", (done) => {
    request(app)
      .post("/")
      .send({
        id: 4,
        name: "IPhone 6",
        price: 2000,
        prodYear: 2015,
        description: "Good Phone"
    })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(4);
        expect(response.body.name).toBe("IPhone 6");
        expect(response.body.price).toBe(2000);
        expect(response.body.prodYear).toBe(2015);
        expect(response.body.description).toBe("Good Phone");
        done();
      });
  });
});