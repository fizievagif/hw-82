import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {TrackHistoryType, TracksType} from "../../types";
import {RootState} from "../../app/store";

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

export const addTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'track/addTrackToHistory',
  async (trackId, {getState}) => {
    const user = getState().users.user;

    if (user) {
      return axiosApi.post('/track_history', {track: trackId}, {headers: {'Authorization': user.token}});

    } else {
      throw new Error('No user!');
    }
  }
);

export const getTrackHistory = createAsyncThunk<TrackHistoryType[]>(
  'track/getHistories',
  async () => {
    const response = await axiosApi.get("/track_history");
    return response.data;
  }
)