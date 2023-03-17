import React, {useEffect, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from '@mui/material';
import FileInput from "../../../Components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchArtists} from "../../artist/artistThunks";
import {AlbumMutation} from "../../../types";
import {selectArtist} from "../../artist/artistSlice";

interface Props {
  onSubmit: (mutation: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtist);

  const [state, setState] = useState<AlbumMutation>({
    title: '',
    year: '',
    artist: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
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
            type='number'
            multiline rows={3}
            id="year" label="Year"
            value={state.year}
            onChange={inputChangeHandler}
            name="year"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            onChange={fileInputChangeHandler}
            name="image"
            type="image/*"
          />
        </Grid>

        <Grid item xs>
          <TextField
            select
            label="Artist"
            name="artist"
            value={state.artist}
            onChange={inputChangeHandler}
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Button type="submit" color="primary" variant="contained" style={{marginTop: '10px'}}>Create</Button>
      </Grid>
    </form>
  );
};

export default AlbumForm;