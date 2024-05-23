import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { use } from "chai";
import mongoose from "mongoose";

const chai = use(chaiHttp);

before(function (done) {
  // Wait 1 second for the database to connect successfully
  setTimeout(done, 1000);
});

after(async () => {
  await mongoose.connection.close();
});

describe("Subscribers API Tests", () => {
  describe("GET /subscribers", () => {
    it("should return all subscribers", async () => {
      const res = await chai.request(app).get("/subscribers");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[0]).to.have.property("_id").that.is.a("string");
      expect(res.body[0]).to.have.property("name").that.is.a("string");
      expect(res.body[0])
        .to.have.property("subscribedChannel")
        .that.is.a("string");
      expect(res.body[0])
        .to.have.property("subscribedDate")
        .that.is.a("string")
        .and.matches(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
    });
  });

  describe("GET /subscribers/names", () => {
    it("should return subscriber names and channels", async () => {
      const res = await chai.request(app).get("/subscribers/names");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[0]).to.have.property("name").that.is.a("string");
      expect(res.body[0])
        .to.have.property("subscribedChannel")
        .that.is.a("string");
    });
  });

  describe("GET /subscribers/{id}", () => {
    it("should return a single subscriber by ID", async () => {
      const subscriberId = "664d7fcb247d94b0293576cb";
      const res = await chai.request(app).get(`/subscribers/${subscriberId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("_id", subscriberId);
      expect(res.body).to.have.property("name").that.is.a("string");
      expect(res.body)
        .to.have.property("subscribedChannel")
        .that.is.a("string");
      expect(res.body)
        .to.have.property("subscribedDate")
        .that.is.a("string")
        .and.matches(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);
    });
  });
});
