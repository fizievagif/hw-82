import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  description:{
    type: String
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;