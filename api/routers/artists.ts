import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send({error: 'All fields are required'});
  }

  try {
    const artist = await Artist.create({
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      description: req.body.description
    });

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return res.sendStatus(500);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  const user = (req as RequestWithUser).user;

  try {
    const artist = await Artist.findById({_id: req.params.id, user: user._id});

    if (!artist) {
      return res.status(403).send({error: "WRONG! You can't do this!"});
    }

    await Artist.deleteOne({_id: req.params.id});
    res.send({message: 'Delete!'});

  } catch (e) {
    res.status(400).send(e);
  }
});

export default artistsRouter;