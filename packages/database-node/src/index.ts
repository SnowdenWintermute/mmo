const keys = require("./keys");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

const mapDimensions = {
  width: 20,
  height: 10,
};

app.get("/world-map", async (req: any, res: any) => {
  try {
    await redisClient.hgetall("maps", (err: Error, maps: Object) => {
      if (err) console.log(err);
      else res.send(maps);
    });
  } catch (error) {
    console.log(error);
  }
});
const { PORT } = process.env;

app.listen(PORT, () => console.log("database on port " + PORT));
