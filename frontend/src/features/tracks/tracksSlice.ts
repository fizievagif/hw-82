import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {TracksType} from "../../types";
import {fetchTracks} from "./tracksThunks";

interface TracksState {
  items: TracksType[],
  fetchLoading: boolean,
}

const initialState: TracksState = {
  items: [],
  fetchLoading: false,
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
  }
})

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;