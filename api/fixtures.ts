import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import crypto from "crypto";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('albums');
    await db.dropCollection('artist');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Vahtan, Vagif, Vahit] = await User.create({
    username: 'Vahtan',
    password: 'vaha123',
    role: 'user',
    token: crypto.randomUUID()
  }, {
    username: 'Vagif',
    password: 'vaga123',
    role: 'admin',
    token: crypto.randomUUID()
  }, {
    username: 'Vahit',
    password: 'vahit123',
    role: 'user',
    token: crypto.randomUUID()
  });

  const [TravisScott, KendrickLamar] = await Artist.create({
    name: 'Travis Scott',
    description: 'Jacques Bermon Webster II (born April 30, 1991)',
    image: 'fixtures/travis.jpg'
  }, {
    name: 'Kendrick Lamar',
    description: 'Kendrick Lamar Duckworth (born June 17, 1987)',
    image: 'fixtures/kendrick.jpg'
  });

  const [Astroworld, JackBoys, MrMorale, DAMN] = await Album.create({
    title: "Astroworld",
    artist: TravisScott._id,
    year: "2018",
    image: "fixtures/astroworld.jpg",
  }, {
    title: "JackBoys",
    artist: TravisScott._id,
    year: "2019",
    image: "fixtures/jackboys.jpg"
  }, {
    title: "Mr. Morale & The Big Steppers",
    artist: KendrickLamar._id,
    year: "2022",
    image: "fixtures/morale.jpg"
  }, {
    title: "DAMN.",
    artist: KendrickLamar._id,
    year: "2017",
    image: "fixtures/damn.jpg"
  });

  await Track.create({
    title: 'STOP TRYING TO BE GOD',
    album: Astroworld._id,
    numberOfTrack: 1,
    duration: '5:39',
  }, {
    title: 'No Bystanders',
    album: Astroworld._id,
    numberOfTrack: 2,
    duration: '3:38',
  }, {
    title: 'Yosemite',
    album: Astroworld._id,
    numberOfTrack: 3,
    duration: '2:30',
  }, {
    title: 'CAROUSEL',
    album: Astroworld._id,
    numberOfTrack: 4,
    duration: '3:00',
  }, {
    title: 'WHO? WHAT!',
    album: Astroworld._id,
    numberOfTrack: 5,
    duration: '2:57',
  }, {
    title: 'OUT WEST',
    album: JackBoys._id,
    numberOfTrack: 1,
    duration: '2:38',
  }, {
    title: 'HIGHEST IN THE ROOM (REMIX)',
    album: JackBoys._id,
    numberOfTrack: 2,
    duration: '4:05',
  }, {
    title: 'WHAT TO DO?',
    album: JackBoys._id,
    numberOfTrack: 3,
    duration: '4:10',
  }, {
    title: 'GANG GANG',
    album: JackBoys._id,
    numberOfTrack: 4,
    duration: '4:05',
  }, {
    title: 'GATTI',
    album: JackBoys._id,
    numberOfTrack: 5,
    duration: '3:01',
  }, {
    title: 'Mr. Morale',
    album: MrMorale._id,
    numberOfTrack: 1,
    duration: '3:31',
  }, {
    title: 'Silent Hill',
    album: MrMorale._id,
    numberOfTrack: 2,
    duration: '3:41',
  }, {
    title: 'Mother I Sober',
    album: MrMorale._id,
    numberOfTrack: 3,
    duration: '6:47',
  }, {
    title: 'We Cry Together',
    album: MrMorale._id,
    numberOfTrack: 4,
    duration: '5:42',
  }, {
    title: 'Purple Hearts',
    album: MrMorale._id,
    numberOfTrack: 5,
    duration: '5:30',
  }, {
    title: 'XXX.',
    album: DAMN._id,
    numberOfTrack: 1,
    duration: '4:14',
  }, {
    title: 'LOYALTY. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 2,
    duration: '3:47',
  }, {
    title: 'HUMBLE. [Explicit version]',
    album: DAMN._id,
    numberOfTrack: 3,
    duration: '2:57',
  }, {
    title: 'DUCKWORTH.',
    album: DAMN._id,
    numberOfTrack: 4,
    duration: '4:09',
  }, {
    title: 'LOVE. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 5,
    duration: '3:33',
  }, {
    title: 'GOD.',
    album: DAMN._id,
    numberOfTrack: 6,
    duration: '4:09',
  }, {
    title: 'DNA. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 7,
    duration: '3:06',
  });

  await db.close();
};

run().catch(console.error);