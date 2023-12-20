import movieModel from './movieModel';
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

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

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