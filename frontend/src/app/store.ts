import {configureStore} from "@reduxjs/toolkit";
import {artistReducer} from "../features/artist/artistSlice";
import {albumsReducer} from "../features/albums/albumsSlice";
import {tracksReducer} from "../features/tracks/tracksSlice";
import {usersReducer} from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;