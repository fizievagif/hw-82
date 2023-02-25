import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/artistSlice";
import {albumsReducer} from "../store/albumsSlice";
import {tracksReducer} from "../store/tracksSlice";

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;