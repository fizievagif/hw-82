import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {AlbumMutation, AlbumsType} from "../../types";

export const fetchAlbums = createAsyncThunk<AlbumsType[], string>(
  'albums/fetchAll',
  async (id) => {
    let response;

    if (id) {
      response = await axiosApi.get('/albums?artist=' + id);
    } else {
      response = await axiosApi.get('/albums');
    }
    return response.data;
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/create',
  async (postMutation) => {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof AlbumMutation)[];

    keys.forEach(key => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/albums', formData);
  }
);

export const deleteAlbums = createAsyncThunk<void, string>(
  'albums/delete',
  async (id) => {

    await axiosApi.delete('/albums/' + id);
  }
);