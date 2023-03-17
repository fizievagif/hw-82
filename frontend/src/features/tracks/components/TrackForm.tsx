import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {TrackMutation} from "../../../types";
import {fetchAlbums} from "../../albums/albumsThunks";
import {useParams} from "react-router-dom";
import {selectAlbums} from "../../albums/albumsSlice";

interface Props {
  onSubmit: (mutation: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const albums = useAppSelector(selectAlbums);

  const [state, setState] = useState<TrackMutation>({
    album: '',
    title: '',
    numberOfTrack: '',
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="numberOfTrack" label="NumberOfTrack"
            value={state.numberOfTrack}
            onChange={inputChangeHandler}
            name="numberOfTrack"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            type='number'
            multiline rows={3}
            id="duration" label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            select
            label="Album"
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {albums.map(album => (
              <MenuItem key={album._id} value={album._id}>{album.title}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Button type="submit" color="primary" variant="contained" style={{marginTop: '10px'}}>Create</Button>
      </Grid>
    </form>
  );
};

export default TrackForm;