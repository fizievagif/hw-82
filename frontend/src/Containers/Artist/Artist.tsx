import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectArtist} from "../../store/artistSlice";
import {fetchArtists} from "../../store/artistThunks";
import ArtistItem from "../../Components/ArtistItem/ArtistItem";

const Artist = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);

  (artists.map(artist => {
    console.log(artist.image)
  }))

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  return (
    <div>
      {artists.map(artist => (
        <ArtistItem
          key={artist._id}
          id={artist._id}
          name={artist.name}
          image={artist.image}
        />
      ))}
    </div>
  );
};

export default Artist;