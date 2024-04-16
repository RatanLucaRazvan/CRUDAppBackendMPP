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

describe("Test Add Processor", () => {
  test("Test Add Processor", (done) => {
    request(app)
      .post("/processors")
      .send({
        name: "Snapdragon 850",
        prodYear: 2020,
        speed: 'high'
    })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Snapdragon 850");
        expect(response.body.prodYear).toBe(2020);
        expect(response.body.speed).toBe("high");
        done();
      });
  });
});

describe("Test Add Phone", () => {
  test("Test Add Phone", (done) => {
    request(app)
      .post("/phones")
      .send({
        name: "IPhone 6",
        price: 2000,
        prodYear: 2015,
        description: "Good Phone",
        processorId: 'processorID2'
    })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("IPhone 6");
        expect(response.body.price).toBe(2000);
        expect(response.body.prodYear).toBe(2015);
        expect(response.body.description).toBe("Good Phone");
        done();
      });
  });
});