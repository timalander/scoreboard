"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TeamSchema = new Schema({
  teamId: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  }
});

export default mongoose.model("Team", TeamSchema);
