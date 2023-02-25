import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/artist/artistSlice";
import {albumsReducer} from "../features/albums/albumsSlice";
import {tracksReducer} from "../features/tracks/tracksSlice";

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;