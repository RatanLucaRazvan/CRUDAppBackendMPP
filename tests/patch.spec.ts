import createObjects from "./createObjects";
import app from "../index";
import request from "supertest";

beforeAll(() => {
    createObjects();
  });
  afterAll(() => {
    app.close();
  })
  
  describe("Test Patch Phoens", () => {
    test("Test edit name", (done) => {
      request(app)
        .patch("/phones/2")
        .send({
            name: "IPhone 6"
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