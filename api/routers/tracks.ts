import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import Album from "../models/Album";
import auth from "../middleware/auth";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res, next) => {
  if (!req.body.title || !req.body.album || !req.body.duration) {
    return res.status(400).send({error: 'All fields are required'});
  }

  try {
    const track = await Track.create({
      album: req.body.album,
      title: req.body.title,
      numberOfTrack: req.body.numberOfTrack,
      duration: req.body.duration,
    });

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
      response = await Track.find({album: album}).populate('album').sort({number: 1});
    } else {
      response = await Track.find().populate('album');
    }

    return res.send(response);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default tracksRouter;