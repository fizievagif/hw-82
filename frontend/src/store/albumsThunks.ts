import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {AlbumsType} from "../types";

export const fetchAlbums = createAsyncThunk<AlbumsType[], string>(
  'artists/fetchAll',
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