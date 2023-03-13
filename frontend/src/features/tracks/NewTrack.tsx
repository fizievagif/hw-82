import { Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import {useNavigate} from "react-router-dom";
import {TrackMutation} from "../../types";
import TrackForm from "./components/TrackForm";
import {createTrack} from "./tracksThunks";

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (trackMutation: TrackMutation) => {
    try {
      await dispatch(createTrack(trackMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New track</Typography>
      <TrackForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewTrack;