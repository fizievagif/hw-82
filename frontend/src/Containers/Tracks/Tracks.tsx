import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {selectTracks} from "../../store/tracksSlice";
import {fetchTracks} from "../../store/tracksThunks";
import {selectAlbums} from "../../store/albumsSlice";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const albums = useAppSelector(selectAlbums);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  return (
    <Grid container rowSpacing={1}>
      <Grid item>
        {/*<Typography variant="h4">Artist name: {(albums.length > 0) ? albums[0].artist.name : "Void"}</Typography>*/}
        {/*<Typography variant="h4">Album name: {tracks[0].album.title}</Typography>*/}
      </Grid>

      <Grid item container alignItems="center">
        {tracks.map(track => (
          <Card sx={{ width: 340, marginRight: 5 }} key={track._id}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Number of track: <b>{track.numberOfTrack}</b>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <b>Track: </b>{track.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Duration: {track.duration}s
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default Tracks;