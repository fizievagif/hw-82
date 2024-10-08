import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {AlbumsType} from "../../types";
import {fetchAlbums} from "./albumsThunks";

interface AlbumsState {
  items: AlbumsType[],
  fetchLoading: boolean,
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
}

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
      state.fetchLoading = false;
      state.items = albums;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
})

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;