"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const dns = require("dns");
const port = process.env.PORT;
const express = require("express");
const axios = require("axios");
const app = express();
const server = require("http").createServer(app);
const { add } = require("@permadeath/message-types");
// const Zone = require("./Zone");
const ws = require("ws");
const wss = new ws.Server({ server });
wss.on("connection", (socket) => {
    console.log("a client connected");
    socket.on("message", (data) => {
        console.log(add(1, 2, 3));
        console.log(data.toString());
    });
});
app.get("/", (req, res) => res.send("hello from zone node"));
server.listen(port, () => console.log("listening on " + port));
let testAddress;
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(port);
    try {
        yield dns.lookup("database-headless-service", (err, address) => {
            if (err)
                console.log(err);
            else {
                console.log("address: " + address);
                testAddress = address;
            }
        });
        console.log(JSON.stringify(testAddress));
        console.log(`http://${testAddress}:80`);
        if (testAddress) {
            const map = yield axios.get(`http://${testAddress}:80/world-map`);
            console.log(map.data);
        }
    }
    catch (error) {
        console.log(error);
    }
}), 3000);
