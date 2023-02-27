import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {selectTracks} from "./tracksSlice";
import {fetchTracks} from "./tracksThunks";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

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
          </Card>
        )).sort((a, b) => a > b ? 1 : +1)}
      </Grid>
    </Grid>
  );
};

export default Tracks;