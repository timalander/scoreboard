"use strict";

import mongoose from "mongoose";
import { TeamSchema } from "./team";

const Schema = mongoose.Schema;

export const ScoreboardSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: true
  },
  league: {
    type: String,
    required: true
  },
  awayScores: {
    type: Array,
    required: true
  },
  homeScores: {
    type: Array,
    required: true
  },
  awayTeam: {
    type: TeamSchema,
    required: true
  },
  homeTeam: {
    type: TeamSchema,
    required: true
  }
});

export default mongoose.model("Scoreboard", ScoreboardSchema);
