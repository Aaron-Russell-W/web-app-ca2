import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovies,
    getNowPlayingMovies,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getMovieWatchProviders,
    getPopularActors,
    getActorMovieCredits,
    getActorDetails,
    getMovieCast,
    getLatestMovie
  } from '../tmdb-api';

const router = express.Router();



router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));

router.get('/tmdb/movies/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const movieDetails = await getMovie(req.params.id);
    res.status(200).json(movieDetails);
}));

router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
}));

router.get('/tmdb/movie/:id/watch/providers', asyncHandler(async (req, res) => {
    const watchProviders = await getMovieWatchProviders(req.params.id);
    res.status(200).json(watchProviders);
}));

router.get('/tmdb/actors/popular', asyncHandler(async (req, res) => {
    const popularActors = await getPopularActors();
    res.status(200).json(popularActors);
}));

router.get('/tmdb/actor/:id/movie_credits', asyncHandler(async (req, res) => {
    const movieCredits = await getActorMovieCredits(req.params.id);
    res.status(200).json(movieCredits);
}));

router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const actorDetails = await getActorDetails(req.params.id);
    res.status(200).json(actorDetails);
}));

router.get('/tmdb/movie/:id/cast', asyncHandler(async (req, res) => {
    const cast = await getMovieCast(req.params.id);
    res.status(200).json(cast);
}));

router.get('/tmdb/movie/latest', asyncHandler(async (req, res) => {
    const latestMovie = await getLatestMovie();
    res.status(200).json(latestMovie);
}));

export default router; 