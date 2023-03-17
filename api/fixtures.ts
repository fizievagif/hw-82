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
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Vahtan, Vagif, Admin] = await User.create({
    username: 'Vahtan',
    password: 'vaha123',
    displayName: 'Vahtan',
    role: 'user',
    token: crypto.randomUUID()
  }, {
    username: 'Vagif',
    password: 'vaga123',
    displayName: 'Vagif',
    role: 'user',
    token: crypto.randomUUID()
  }, {
    username: 'Admin',
    password: 'admin123',
    displayName: 'Admin',
    role: 'admin',
    token: crypto.randomUUID()
  });

  const [TravisScott, KendrickLamar] = await Artist.create({
    user: Vahtan._id,
    name: 'Travis Scott',
    description: 'Jacques Bermon Webster II (born April 30, 1991)',
    image: 'fixtures/travis.jpg'
  }, {
    user: Vagif._id,
    name: 'Kendrick Lamar',
    description: 'Kendrick Lamar Duckworth (born June 17, 1987)',
    image: 'fixtures/kendrick.jpg'
  });

  const [Astroworld, JackBoys, MrMorale, DAMN] = await Album.create({
    user: Vahtan._id,
    title: "Astroworld",
    artist: TravisScott._id,
    year: "2018",
    image: "fixtures/astroworld.jpg",
  }, {
    user: Vahtan._id,
    title: "JackBoys",
    artist: TravisScott._id,
    year: "2019",
    image: "fixtures/jackboys.jpg"
  }, {
    user: Vagif._id,
    title: "Mr. Morale & The Big Steppers",
    artist: KendrickLamar._id,
    year: "2022",
    image: "fixtures/morale.jpg"
  }, {
    user: Vagif._id,
    title: "DAMN.",
    artist: KendrickLamar._id,
    year: "2017",
    image: "fixtures/damn.jpg"
  });

  await Track.create({
    user: Vahtan._id,
    title: 'STOP TRYING TO BE GOD',
    album: Astroworld._id,
    numberOfTrack: 1,
    duration: '5:39',
  }, {
    user: Vahtan._id,
    title: 'No Bystanders',
    album: Astroworld._id,
    numberOfTrack: 2,
    duration: '3:38',
  }, {
    user: Vahtan._id,
    title: 'Yosemite',
    album: Astroworld._id,
    numberOfTrack: 3,
    duration: '2:30',
  }, {
    user: Vahtan._id,
    title: 'CAROUSEL',
    album: Astroworld._id,
    numberOfTrack: 4,
    duration: '3:00',
  }, {
    user: Vahtan._id,
    title: 'WHO? WHAT!',
    album: Astroworld._id,
    numberOfTrack: 5,
    duration: '2:57',
  }, {
    user: Vahtan._id,
    title: 'OUT WEST',
    album: JackBoys._id,
    numberOfTrack: 1,
    duration: '2:38',
  }, {
    user: Vahtan._id,
    title: 'HIGHEST IN THE ROOM (REMIX)',
    album: JackBoys._id,
    numberOfTrack: 2,
    duration: '4:05',
  }, {
    user: Vahtan._id,
    title: 'WHAT TO DO?',
    album: JackBoys._id,
    numberOfTrack: 3,
    duration: '4:10',
  }, {
    user: Vahtan._id,
    title: 'GANG GANG',
    album: JackBoys._id,
    numberOfTrack: 4,
    duration: '4:05',
  }, {
    user: Vahtan._id,
    title: 'GATTI',
    album: JackBoys._id,
    numberOfTrack: 5,
    duration: '3:01',
  }, {
    user: Vagif._id,
    title: 'Mr. Morale',
    album: MrMorale._id,
    numberOfTrack: 1,
    duration: '3:31',
  }, {
    user: Vagif._id,
    title: 'Silent Hill',
    album: MrMorale._id,
    numberOfTrack: 2,
    duration: '3:41',
  }, {
    user: Vagif._id,
    title: 'Mother I Sober',
    album: MrMorale._id,
    numberOfTrack: 3,
    duration: '6:47',
  }, {
    user: Vagif._id,
    title: 'We Cry Together',
    album: MrMorale._id,
    numberOfTrack: 4,
    duration: '5:42',
  }, {
    user: Vagif._id,
    title: 'Purple Hearts',
    album: MrMorale._id,
    numberOfTrack: 5,
    duration: '5:30',
  }, {
    user: Vagif._id,
    title: 'XXX.',
    album: DAMN._id,
    numberOfTrack: 1,
    duration: '4:14',
  }, {
    user: Vagif._id,
    title: 'LOYALTY. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 2,
    duration: '3:47',
  }, {
    user: Vagif._id,
    title: 'HUMBLE. [Explicit version]',
    album: DAMN._id,
    numberOfTrack: 3,
    duration: '2:57',
  }, {
    user: Vagif._id,
    title: 'DUCKWORTH.',
    album: DAMN._id,
    numberOfTrack: 4,
    duration: '4:09',
  }, {
    user: Vagif._id,
    title: 'LOVE. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 5,
    duration: '3:33',
  }, {
    user: Vagif._id,
    title: 'GOD.',
    album: DAMN._id,
    numberOfTrack: 6,
    duration: '4:09',
  }, {
    user: Vagif._id,
    title: 'DNA. [Explicit]',
    album: DAMN._id,
    numberOfTrack: 7,
    duration: '3:06',
  });

  await db.close();
};

run().catch(console.error);