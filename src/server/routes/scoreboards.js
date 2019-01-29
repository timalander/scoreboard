"use strict";

import express from "express";

import { getScoreboard } from "../controllers/scoreboards";

const router = express.Router();

router.route("/:id").get(getScoreboard);

export default router;
