import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {ArtistType} from "../types";
import {fetchArtists} from "./artistThunks";

interface ArtistsState {
  items: ArtistType[],
  fetchLoading: boolean,
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
}

export const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.items = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
})

export const artistReducer = artistSlice.reducer;
export const selectArtist = (state: RootState) => state.artists.items;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;