import {ArtistType} from "../../types";
import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchArtists = createAsyncThunk<ArtistType[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<ArtistType[]>('/artists');
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/delete',
  async (id) => {

    await axiosApi.delete('/artists/' + id);
  }
);