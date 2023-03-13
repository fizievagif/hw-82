import { Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import {useNavigate} from "react-router-dom";
import AlbumForm from "./components/AlbumForm";
import {AlbumMutation} from "../../types";
import {createAlbum} from "./albumsThunks";

const NewAlbum = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(albumMutation)).unwrap();
      navigate('/');
    } catch (e) {
      // error
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>New album</Typography>
      <AlbumForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewAlbum;