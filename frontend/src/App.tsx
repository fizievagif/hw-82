import React from 'react';
import Artist from "./features/artist/Artist";
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Register from "./features/users/Register";
import AppToolbar from "./Components/UI/AppToolbar/AppToolbar";
import {Container} from "@mui/material";
import Login from "./features/users/Login";
import TrackHistory from "./features/trackHistory/TrackHistory";
import NewAlbum from "./features/albums/NewAlbum";
import NewArtist from "./features/artist/NewArtist";
import NewTrack from "./features/tracks/NewTrack";

function App() {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artist/>} />
            <Route path='/albums/:id' element={<Albums/>} />
            <Route path='/albums/tracks/:id'  element={<Tracks/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/track_history" element={<TrackHistory/>}/>
            <Route path="/new-artist" element={<NewArtist/>}/>
            <Route path="/new-album" element={<NewAlbum/>}/>
            <Route path="/new-track" element={<NewTrack/>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
