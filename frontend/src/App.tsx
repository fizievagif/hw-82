import React from 'react';
import Artist from "./Containers/Artist/Artist";
import {Route, Routes} from "react-router-dom";
import Albums from "./Containers/Albums/Albums";
import Tracks from "./Containers/Tracks/Tracks";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Artist/>}/>
        <Route path='/albums/:id' element={<Albums/>}/>
        <Route path='/albums/tracks/:id'  element={<Tracks/>}/>
      </Routes>
    </div>
  );
}

export default App;
