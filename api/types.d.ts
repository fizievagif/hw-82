export interface ArtistType {
  name: string,
  description: string,
  image: string | null,
}

export interface AlbumType {
  title: string,
  artist: string,
  year: string,
  image: string | null,
}

export interface TrackType {
  title: string,
  album: string,
  duration: string,
}

export interface IUser {
  username: string,
  password: string,
  token: string,
}