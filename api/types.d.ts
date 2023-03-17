export interface ArtistType {
  name: string,
  description: string,
  image: string | null,
}

export interface AlbumType {
  title: string,
  artist: string,
  year: number,
  image: string | null,
}

export interface TrackType {
  title: string,
  album: string,
  numberOfTrack: number,
  duration: string,
}

export interface TrackHistoryType {
  user: string,
  track: string,
  datetime: string,
}

export interface IUser {
  username: string,
  password: string,
  token: string,
  role: string,
  displayName: string,
  avatar: string | null,
  googleId?: string,
}