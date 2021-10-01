"use strict";
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`Zone node is running on port ${port}`));
