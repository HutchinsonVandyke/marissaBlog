require("ts-node").register();
//const config = require("../Config/config");
const { Seeder } = require("mongo-seeding");
const path = require("path");
const configUtil = require("../config/configUtil.js");

// TODO:
// Refactor to not have this hardcoded
const seedConfig = {
  database: {
    host: "localhost",
    port: 27017,
    name: "hutch"
  },
  dropDatabase: true
};
const seeder = new Seeder(seedConfig);
console.log("Seeding from " + path.resolve("Seed", "data"));
const collections = seeder.readCollectionsFromPath(
  path.resolve("./data"),
  {
    extensions: ["ts"],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
  }
);

seeder
  .import(collections)
  .then(() => {
    console.log("Success loading data into database");
    console.log(collections)
  })
  .catch(err => {
    console.log("Error loading data into database", err);
  });