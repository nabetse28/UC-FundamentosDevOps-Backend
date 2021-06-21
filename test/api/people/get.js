process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const conn = require("../../../database/index");

describe("GET /people", () => {
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

  it("OK, getting people has no people", (done) => {
    request(app)
      .get("/")
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, getting people has 1 person", (done) => {
    request(app)
      .post("/person")
      .send({
        name: "TEST NAME",
        age: 0,
        background: "BACKGROUND TEST",
        description: "DESCRIPTION TEST",
      })
      .then((res) => {
        request(app)
          .get("/")
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => done(err));
  });
});
