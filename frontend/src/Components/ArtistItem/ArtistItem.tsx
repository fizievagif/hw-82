import React from 'react';
import {Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/users/usersSlice";
import {deleteArtist} from "../../features/artist/artistThunks";

interface Props {
  id: string,
  name: string,
  image: string | null,
}

const ArtistItem: React.FC<Props> = ({id, name, image}) => {
  const dispatch = useAppDispatch();
  const cardImage = 'http://localhost:8000/' + image;
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const remove = (id: string) => {
    dispatch(deleteArtist(id));
    navigate('/');
  };

  return (

      <Card sx={{ width: 345, margin: 5 }}>
        <CardActionArea>
          {image ?
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt={name}
          /> : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Link to={'/albums/' + id}>{name}</Link>
            </Typography>

            {user && user.role === 'admin' && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(id)}
                style={{marginLeft: '10px'}}
              > Delete
              </Button>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
  );
};

export default ArtistItem;