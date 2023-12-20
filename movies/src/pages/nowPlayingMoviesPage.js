import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const NowPlayingPage = () => {
    
    const {  data, error, isLoading, isError }  = useQuery('nowPlaying', getNowPlayingMovies)

    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    const nowPlayingMovies = data.results;

    return (
        <PageTemplate
            title="Movies Currently In Theatres"
            movies={nowPlayingMovies}
            action={(movie) => {
                return <AddToWatchlistIcon movie={movie} />;
            }}
        />
    );
};

export default NowPlayingPage;