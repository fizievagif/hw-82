import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistType} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({error: 'All fields are required'});
  }

  const artistData: ArtistType = {
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    description: req.body.description
  }

  const artist = new Artist(artistData);

  try {
    await artist.save();
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default artistsRouter;