import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAlbums} from "../../store/albumsSlice";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {fetchAlbums} from "../../store/albumsThunks";

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const {id} = useParams() as {id: string};
  const cardImage  = 'http://localhost:8000/';

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  return (
    <Grid container rowSpacing={1}>
      <Typography variant="h4">Artist name: {(albums.length > 0) ? albums[0].artist.name : "Void  "}</Typography>

      <Grid item container alignItems="center">
        {albums.map(album => (
          <Card sx={{ width: 300, margin: 5 }} key={album._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={cardImage + album.image}
                alt={album.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {album.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {album.year}
                </Typography>
                <Link to={'/albums/tracks/' + album._id}>View more</Link>
              </CardContent>
            </CardActionArea>
          </Card>
        )).reverse()}
      </Grid>
    </Grid>
  );
};

export default Albums;