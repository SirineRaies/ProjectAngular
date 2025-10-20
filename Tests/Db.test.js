const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("../src/Database/Database.js");

dotenv.config(); 

describe("Database connection", () => {

  it("should connect to MongoDB successfully", async () => {
    await expect(
      db.mongoose.connect(db.url)
    ).resolves.toBeDefined();
  });

  it("should fail to connect with wrong URI", async () => {
    await expect(
      db.mongoose.connect("mongodb://localhost:27018/wrongdb")
    ).rejects.toThrow();
  });

  afterAll(async () => {
  if (db.mongoose.connection.readyState !== 0) {
    await db.mongoose.connection.close();
  }
});
});