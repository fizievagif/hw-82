import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {TrackHistoryType, TracksType} from "../../types";
import {fetchTracks, getTrackHistory} from "./tracksThunks";

interface TracksState {
  items: TracksType[],
  fetchLoading: boolean,
  trackHistory: TrackHistoryType[],
}

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
  trackHistory: [],
}

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
      state.fetchLoading = false;
      state.items = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(getTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(getTrackHistory.fulfilled, (state, {payload: history}) => {
      state.fetchLoading = false;
      state.trackHistory = history;
    });
    builder.addCase(getTrackHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
})

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectHistories = (state: RootState) => state.tracks.trackHistory;