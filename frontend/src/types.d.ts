export interface ArtistType {
  _id: string;
  name: string;
  image: string | null;
}

export interface AlbumsType {
  _id: string;
  artist: ArtistType;
  title: string;
  year: number;
  image: string | null;
}

export interface TracksType {
  _id: string;
  title: string;
  album: AlbumsType;
  numberOfTrack: number;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}