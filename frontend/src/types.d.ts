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