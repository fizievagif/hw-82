export interface ArtistType {
  _id: string;
  user: User;
  name: string;
  description: string,
  image: string | null;
}

export interface ArtistMutation {
  name: string;
  description: string,
  image: string | null;
}

export interface AlbumsType {
  _id: string;
  artist: ArtistType;
  user: User;
  title: string;
  year: number;
  image: string | null;
}

export interface AlbumMutation {
  title: string;
  year: string;
  artist: string,
  image: string | null;
}

export interface TracksType {
  _id: string;
  user: User;
  title: string;
  album: AlbumsType;
  numberOfTrack: number;
  duration: string;
}

export interface TrackMutation {
  title: string;
  album: string;
  numberOfTrack: string;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: string | null
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  role: string;
  token: string;
}

export interface UserResponse {
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

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistoryType {
  _id: string;
  user: string;
  track: TracksType;
  datetime: string;
}