import {ArtistMutation, ArtistType} from "../../types";
import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchArtists = createAsyncThunk<ArtistType[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<ArtistType[]>('/artists');
    return response.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async (postMutation) => {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof ArtistMutation)[];

    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/artists', formData);
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/delete',
  async (id) => {

    await axiosApi.delete('/artists/' + id);
  }
);