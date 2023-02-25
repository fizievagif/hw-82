import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtist} from "../../store/artistSlice";
import {fetchArtists} from "../../store/artistThunks";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";
import {Grid} from "@mui/material";

const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item container justifyContent="space-between" alignItems="center">
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