  import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {AlbumType} from "../types";

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.title || !req.body.artist || !req.body.year) {
    return res.status(400).send({error: 'All fields are required'});
  }

  const albumData: AlbumType = {
    artist: req.body.artist,
    title: req.body.title,
    image: req.file ? req.file.filename : null,
    year: req.body.year,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

albumsRouter.get('/', async (req, res) => {
  try {
    const albums = await Album.find().populate('artist').sort({'year': 1});
    return res.send(albums)
  } catch (e) {
    return res.sendStatus(500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');

    if (!album) {
      res.status(404).send({error: 'Album is not found'});
    }

    return res.send(album);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default albumsRouter;