import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import {TrackType} from "../types";
import Album from "../models/Album";

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.album || !req.body.duration) {
    return res.status(400).send({error: 'All fields are required'});
  }

  const trackData: TrackType = {
    album: req.body.album,
    title: req.body.title,
    duration: req.body.duration,
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

tracksRouter.get('/', async (req, res) => {
  try {
    let response;

    const artist = req.query.artist;
    const album = req.query.album;

    if (artist) {
      const albums = await Album.find({artist: artist});
      response = await Track.find().where('album').in(albums).exec();
    } else if (album) {
      response = await Track.find({album: album});
    } else {
      response = await Track.find().populate('album');
    }

    return res.send(response);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default tracksRouter;