import React, {useEffect} from 'react';
import {Grid, Paper, Typography} from "@mui/material";
import {TrackHistoryType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import {Navigate} from "react-router-dom";
import {selectHistories} from "../tracks/tracksSlice";
import {getTrackHistory} from "../tracks/tracksThunks";


const TrackHistory: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectHistories);
  console.log(trackHistory);

  useEffect(() => {
    dispatch(getTrackHistory());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login"/>
  }

  return (
    <>
      <Grid container spacing={3}>
        {trackHistory? trackHistory.map((item: TrackHistoryType) => {
          return (
            <Grid item xs={8} key={item._id}>
              <Paper>
                {item &&
                  item.track &&
                  item.track.album &&
                  item.track.album.artist &&
                  item.track.album.artist.name && (
                    <Typography>
                      Artist: {item.track.album.artist.name}
                    </Typography>
                  )}
                {item && item.track && item.track.title && (
                  <Typography >
                    Track: {item.track.title}
                  </Typography>
                )}
                <Typography>
                  Datetime: {item.datetime}
                </Typography>
              </Paper>
            </Grid>
          );
        }) : null}
      </Grid>
    </>
  );
};

export default TrackHistory;