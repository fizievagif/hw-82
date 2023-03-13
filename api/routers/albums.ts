import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Albums from "../models/Artist";

const albumsRouter = express.Router();

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.title || !req.body.artist || !req.body.year) {
    return res.status(400).send({error: 'All fields are required'});
  }

  try {
    const album = await Album.create({
      artist: req.body.artist,
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      year: req.body.year,
    });

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
    let albums;
    if (req.query.artist) {
      albums = await Album.find({artist: req.query.artist}).populate('artist').sort({'year': 1});
    } else {
      albums = await Album.find().sort({year: 1});
    }

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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  try {
    const albums = await Albums.findById({_id: req.params.id, user: user._id});

    if (!albums) {
      return res.status(403).send({error: "WRONG! You can't do this!"});
    }

    await Albums.deleteOne({_id: req.params.id});
    res.send({message: 'Delete!'});

  } catch (e) {
    res.status(400).send(e);
  }
});

export default albumsRouter;