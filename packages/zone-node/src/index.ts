require("dotenv").config();
const dns = require("dns");
const port = process.env.PORT;
const express = require("express");
const axios = require("axios");
const app = express();
const server = require("http").createServer(app);
const { add } = require("@permadeath/message-types");
console.log("zone node started");

const ws = require("ws");
const wss = new ws.Server({ server });

wss.on("connection", (socket: any) => {
  console.log("a client connected");
  socket.on("message", (data: any) => {
    console.log(add(1, 2, 3));
    console.log(data.toString());
  });
});

app.get("/", (req: any, res: any) => res.send("hello from zone node"));

server.listen(port, () => console.log("listening on " + port));

let testAddress: string;
setInterval(async () => {
  console.log(port);
  try {
    await dns.lookup("database-headless-service", (err: any, address: any) => {
      if (err) console.log(err);
      else {
        console.log("address: " + address);
        testAddress = address;
      }
    });
    console.log(JSON.stringify(testAddress));
    console.log(`http://${testAddress}:80`);
    if (testAddress) {
      const map = await axios.get(`http://${testAddress}:80/world-map`);
      console.log(map.data);
    }
  } catch (error) {
    console.log(error);
  }
}, 3000);
