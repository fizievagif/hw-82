import { Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import {useNavigate} from "react-router-dom";
import {ArtistMutation} from "../../types";
import ArtistForm from "./components/ArtistForm";
import {createArtist} from "./artistThunks";

const NewArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (artistMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(artistMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New artist</Typography>
      <ArtistForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewArtist;