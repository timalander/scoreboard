"use strict";

import express from "express";
import "express-async-errors";
import path from "path";
import bodyParser from "body-parser";
import helmet from "helmet";
import pino from "pino";

import routes from "./routes/scoreboards";

const app = express();
const logger = pino({ prettyPrint: true });

app.use(helmet());
app.use(bodyParser.json());

app.use("/api/scoreboards", routes);
app.use(express.static(path.join(__dirname + "/static")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/index.html"));
});

// Logging and exception handling
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err);
    res.json({ error: err.message });
  }
});

export default app;
