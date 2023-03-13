import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, useParams} from "react-router-dom";
import {Button, Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {selectTracks} from "./tracksSlice";
import {addTrackToHistory, fetchTracks} from "./tracksThunks";
import {selectUser} from "../users/usersSlice";
import {deleteAlbums} from "../albums/albumsThunks";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const {id} = useParams() as {id: string};
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  const onPlayClick = (id: string) => {
    dispatch(addTrackToHistory(id));
  };

  const remove = (id: string) => {
    dispatch(deleteAlbums(id));
    // navigate('/');
  };


  if (!user) {
    return <Navigate to="/login"/>
  }

  return (
    <Grid container rowSpacing={1}>
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
            <Button variant="text" onClick={() => onPlayClick(track._id)}>
              Play
            </Button>

            {user && user.role === 'admin' && (
              <Button
                variant="text"
                color="error"
                onClick={() => remove(track._id)}
                style={{marginLeft: '10px'}}
              > Delete
              </Button>
            )}
          </Card>
        )).sort((a, b) => a > b ? 1 : +1)}
      </Grid>
    </Grid>
  );
};

export default Tracks;