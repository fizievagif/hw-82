import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  try {
    const items = await TrackHistory.find({user: user._id}).sort({datetime: 1}).populate( {path : 'track', populate: {path: 'album', populate: {path: 'artist'}}});

    if (!items) {
      return res.status(400).send({message: 'Not found'});
    }

    res.send(items);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

trackHistoryRouter.post('/', auth ,async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const datetime = new Date().toISOString()

  if (!req.body.track) {
    return res.status(400).send('All fields are required');
  }

  try {
    const trackHistory = await TrackHistory.create({
      user: user._id.toString(),
      track: req.body.track,
      datetime,
    });

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