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