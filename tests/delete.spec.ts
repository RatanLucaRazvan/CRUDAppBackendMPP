import createObjects from "./createObjects";
import app from "../index";
import request from "supertest";

beforeAll(() => {
    createObjects();
  });
  afterAll(() => {
    app.close();
  })


describe("Test Delete Processor", () => {
  test("Delete processor with good id", (done) => {
    request(app)
    .delete("/processors/1")
    .then((response) => {
      expect(response.status).toBe(204);
      done();
    });
  });
  test("Delete processor with bad id", (done) => {
    request(app)
    .delete("/processors/10")
    .then((response) => {
      expect(response.status).toBe(404);
      done();
    })
  })
})
  
describe("Test Delete Phone", () => {
    test("Delete phone with good id", (done) => {
      request(app)
        .delete("/phones/2")
        .then((response) => {
          expect(response.status).toBe(204);
          done();
        });
    });
    test("Delete phone with bad id", (done) => {
        request(app)
          .delete("/phones/10")
          .then((response) => {
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Phone does not exist");
            done();
          });
      });
  });