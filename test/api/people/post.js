process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const conn = require("../../../database/index");

describe("POST /people", () => {
  before((done) => {
    conn
      .connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, creating a new person", (done) => {
    request(app)
      .post("/person")
      .send({
        name: "TEST NAME",
        age: 0,
        background: "BACKGROUND TEST",
        description: "DESCRIPTION TEST",
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("name");
        expect(body).to.contain.property("age");
        expect(body).to.contain.property("background");
        expect(body).to.contain.property("description");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, person requires other fields", (done) => {
    request(app)
      .post("/person")
      .send({ name: "TEST NAME" })
      .then((res) => {
        const body = res.body;
        console.log(body);
        expect(body.errors.background.name).to.equal("ValidatorError");
        expect(body.errors.age.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });
});
