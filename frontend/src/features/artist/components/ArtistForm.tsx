import React, {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import FileInput from "../../../Components/UI/FileInput/FileInput";
import {ArtistMutation} from "../../../types";

interface Props {
  onSubmit: (mutation: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({onSubmit}) => {
  const [state, setState] = useState<ArtistMutation>({
    name: '',
    description: '',
    image: null,
  });

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
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
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

        <Button type="submit" color="primary" variant="contained" style={{marginTop: '10px'}}>Create</Button>
      </Grid>
    </form>
  );
};

export default ArtistForm;