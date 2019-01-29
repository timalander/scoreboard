"use strict";

import _ from "lodash";

import { getExternalScoreboardData } from "../services/scoreboardService";

export const getScoreboard = async (req, res) => {
  const { id: scoreboardId } = req.params;

  if (!scoreboardId) {
    throw new Error("You must specify an id");
  }

  const scoreboardData = await getExternalScoreboardData(scoreboardId);
  return res.status(200).json(scoreboardData);
};
