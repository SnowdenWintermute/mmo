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

const mapDimensions = {
  width: 20,
  height: 10,
};

const createMapTableIfNotExists = async () =>
  await pgClient.query(
    "CREATE TABLE IF NOT EXISTS chunks (id SERIAL PRIMARY KEY, data INTEGER[][])"
  );
const createWorldMap = () => {
  let newMap = [];
  for (let i = mapDimensions.height; i > 0; i--) {
    let mapRow = [];
    for (let i = mapDimensions.width; i > 0; i--) {
      mapRow.push(Math.round(Math.random() * 5));
    }
    newMap.push(mapRow);
  }
  return newMap;
};

const loadWorld = async () => {
  try {
    await createMapTableIfNotExists();
    const currentMap = await pgClient.query("SELECT * FROM chunks");
    if (currentMap.rows.length) {
      console.log("map already exists");
      redisClient.hset("maps", "map1", JSON.stringify(currentMap.rows));
    } else {
      console.log("creating map...");
      const newWorldMap = createWorldMap();
      await pgClient.query("INSERT INTO chunks (data) values ($1)", [
        newWorldMap,
      ]);
      redisClient.hset("maps", "map1", JSON.stringify(newWorldMap));
    }
  } catch (error) {
    console.log(error);
  }
};

loadWorld();

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
// setInterval(() => console.log(PORT), 1000);
app.listen(PORT, () => console.log("database on port " + PORT));
