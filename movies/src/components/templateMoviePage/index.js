import React from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from 'react-router-dom';
import { getMovieImages, getMovieCast } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

const TemplateMoviePage = ({ movie, children }) => {
  const { data: imageData, error: imageError, isLoading: imageLoading, isError: imageIsError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  const { data: castData, isLoading: castLoading, isError: castIsError } = useQuery(
    ['cast', { id: movie.id }],
    getMovieCast
  );

  if (imageLoading || castLoading) {
    return <Spinner />;
  }

  if (imageIsError) {
    return <h1>{imageError.message}</h1>;
  }

  if (castIsError) {
    // Handle cast fetch error
  }

  const images = imageData.posters;
  const cast = castData?.cast;

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
          <h3>Cast</h3>
          <div>
            {cast.map((actor) => (
              <div key={actor.id}>
                <Link to={`/actors/${actor.id}`}>
                  {actor.name}
                </Link>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
