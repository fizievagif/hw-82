import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtist} from "../../features/artist/artistSlice";
import {fetchArtists} from "../../features/artist/artistThunks";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";
import {Grid} from "@mui/material";

const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <h1>Artists:</h1>
      <Grid item container alignItems="center">
        {artists.map(artist => (
          <ArtistItem
            key={artist._id}
            id={artist._id}
            name={artist.name}
            image={artist.image}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Artist;