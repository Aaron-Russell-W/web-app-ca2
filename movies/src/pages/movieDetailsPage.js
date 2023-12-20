import React from "react";
import { useParams } from 'react-router-dom';
import { getMovie, getMovieWatchProviders, getMovieCast } from '../api/tmdb-api';
import { useQuery } from "react-query";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();
  console.log("Movie ID in MoviePage:", id);
  const { data: movie, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery(
    ["movie", { id }],
    getMovie
  );

  const { data: availability } = useQuery(
    ["watch", { id }],
    getMovieWatchProviders
  );

  const { data: cast, error: castError, isLoading: castLoading, isError: castIsError } = useQuery(
    ["cast", { id }],
    getMovieCast
  );

  const isLoading = movieLoading || castLoading;
  const isError = movieIsError || castIsError;
  const error = movieError || castError;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} availability={availability} cast={cast} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
