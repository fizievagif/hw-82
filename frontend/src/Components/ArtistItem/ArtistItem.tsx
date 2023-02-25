import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface Props {
  id: string,
  name: string,
  image: string | null,
}

const ArtistItem: React.FC<Props> = ({id, name, image}) => {
  const cardImage = 'http://localhost:8000/' + image;

  return (
    <Link to={'/albums/' + id}>
      <Card sx={{ width: 345 }}>
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
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ArtistItem;