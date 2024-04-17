import createObjects from "./createObjects";
import app from "../index";
import request from "supertest";

beforeAll(() => {
    createObjects();
  });
  afterAll(() => {
    app.close();
  })
  

  describe("Test Patch Processors", () => {
    test("Test edit speed and name", (done) => {
      request(app)
      .patch("/processors/1")
      .send({
        name: "Snapdragon",
        prodYear: 2015,
        speed: "low"
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Snapdragon");
        expect(response.body.speed).toBe("low");
        done();
      });
    });
    test("Test 404 code", (done) => {
      request(app)
        .patch("/processors/10")
        .send({
            name: "Snapdragon"
        })
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body.message).toBe("Processor does not exist");
          done();
        });
    });
  })
  describe("Test Patch Phoens", () => {
    test("Test edit name", (done) => {
      request(app)
        .patch("/phones/2")
        .send({
          name: "IPhone 6",
          price: 2000,
          prodYear: 2015,
          description: "Good Phone"
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.name).toBe("IPhone 6");
          done();
        });
    });
    test("Test 404 code", (done) => {
        request(app)
          .patch("/phones/10")
          .send({
              name: "IPhone 6"
          })
          .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Phone does not exist");
            done();
          });
      });
  });