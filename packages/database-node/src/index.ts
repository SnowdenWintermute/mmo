const keys = require("./keys");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

setInterval(async () => {
  try {
    const testData = await pgClient.query("SELECT * FROM maps");
    console.log(testData);
  } catch (error) {
    console.log(error);
  }
  console.log("eyy: " + keys.pgPort);
  // console.log("pgclient: ", redisClient);
}, 1000);
