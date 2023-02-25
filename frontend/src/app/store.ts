import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../store/artistSlice";
import {albumsReducer} from "../store/albumsSlice";

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;