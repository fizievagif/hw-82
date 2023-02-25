import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TracksType} from "../../types";

export const fetchTracks = createAsyncThunk<TracksType[], string>(
  'tracks/fetchAll',
  async (id) => {
    let response;

    if (id) {
      response = await axiosApi.get('/tracks?album=' + id);
    } else {
      response = await axiosApi.get('/tracks');
    }
    return response.data;
  }
);