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
      await axiosApi.post('/track_history', {track: trackId});

    } else {
      throw new Error('No user!');
    }
  }
);

export const deleteTrack = createAsyncThunk<void, string>(
  'track/delete',
  async (id) => {

    await axiosApi.delete('/tracks/' + id);
  }
);

export const getTrackHistory = createAsyncThunk<TrackHistoryType[], void>(
  "track/getHistory", async () => {
  const response = await axiosApi.get("/track_history");

  return response.data;
});