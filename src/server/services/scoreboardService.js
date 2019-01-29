"use strict";

import axios from "axios";
import Scoreboard from "../models/scoreboard";
import Team from "../models/team";

const BASE_URL = " https://chumley.barstoolsports.com/dev/data/games/";
const SCOREBOARD_TTL = 60 * 15 * 1000; // 15min in MS

const createTeams = data => {
  const { away_team: awayTeam, home_team: homeTeam } = data;

  return [awayTeam, homeTeam].map(team => {
    return new Team({
      teamId: team.team_id,
      fullName: team.full_name,
      abbreviation: team.abbreviation
    });
  });
};

export const getExternalScoreboardData = async scoreboardId => {
  const cachedScoreboardData = await Scoreboard.findOne({ id: scoreboardId });
  if (
    cachedScoreboardData &&
    cachedScoreboardData.lastUpdated > Date.now() - SCOREBOARD_TTL
  ) {
    return cachedScoreboardData;
  }

  let externalScoreboardResponse;
  try {
    externalScoreboardResponse = await axios.get(
      `${BASE_URL}${scoreboardId}.json`
    );
  } catch (error) {
    throw new Error("Invalid id");
  }
  const { data: externalScoreboardData } = externalScoreboardResponse;

  const [homeTeam, awayTeam] = createTeams(externalScoreboardData);

  const scoreboard = new Scoreboard({
    id: scoreboardId,
    lastUpdated: new Date(),
    league: externalScoreboardData.league,
    awayScores: externalScoreboardData.away_period_scores,
    homeScores: externalScoreboardData.home_period_scores,
    awayTeam,
    homeTeam
  }).toObject();

  // remove the _id before upsert
  delete scoreboard._id;

  const updatedScoreboard = await Scoreboard.findOneAndUpdate(
    { id: scoreboardId },
    scoreboard,
    { new: true, upsert: true }
  );

  return updatedScoreboard;
};
