import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryType} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  const token = req.get('Authorization');

  if (!req.body.track) {
    return res.status(400).send('All fields are required');
  }

  if (!token) {
    return res.status(401).send({error: 'No token present'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'Wrong token!'});
  }

  const datetime = new Date().toISOString()

  const trackHistoryData: TrackHistoryType = {
    user: user._id.toString(),
    track: req.body.track,
    datetime,
  }

  const trackHistory = new TrackHistory(trackHistoryData);

  try {
    await trackHistory.save();
    return res.send(trackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default trackHistoryRouter;