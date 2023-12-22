# Assignment 2 - Web API.

Name: Aaron Russell

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + All APIs connect through the backend 'movies-api'
 + Login and Sign Up added to the application.
 + Routes are protected depending on sign in status.

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]
+ First go to the 'movies' folder and do an npm start here to start the frontend server.
+ Next go to the 'movies-api' folder and do an npm run dev here to start the backend server.
+ The application should run as expected.
## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

This is a .env file made in the movies-api folder
______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=YOUR-MONGODB-DB
TMDB_KEY=YOUR-TMDB-AUTH-KEY
SECRET=YOUR SECRET
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/movies/tmdb/upcoming | GET | Gets a list of upcoming movies from TMDB
- /api/movies/tmdb/genres | GET | Gets a list of genres from tmdb
- /api/movies/tmdb/movies | GET | Gets a list of movies from tmdb
- /api/movies/tmdb/now_playing | GET | Gets a list of movies currently in cinemas from tmdb
- /api/movies/tmdb/movie/{id} | GET | Gets a single movie by id from tmdb
- /api/movies/tmdb/movie/{id}/images | GET | Gets a movies images from tmdb
- /api/movies/tmdb/movie/{id}/images | GET | Gets a movies reviews from tmdb
- /api/movies/tmdb/movie/{id}/watch/providers | GET | Gets where you can watch a movie from TMDB
- /api/movies/tmdb/actors/popular | GET | Gets a list of popular actors from TMDB
- /api/movies/tmdb/actor/{id} | GET | Gets an individual actor from TMDB 
- /api/movies/tmdb/actor/{id} | GET | Gets an individual actor's movie credits from TMDB 
- /api/movies/tmdb/movie/{id}/cast | GET | Gets the cast from a movie from tmdb
 - /api/movies/tmdb/movie/latest | GET | Gets the latest movie from TMDB.
 - /api/users/ | POST | Adds a user via signup to the DB
 - api/users/{id} | GET | Receives a user from the DB
## Security and Authentication

Give details of authentication/security implemented on the API (e.g. passport/sessions). Indicate which routes are protected.
The web app is protected by using bearer keys given to individual accounts in the DB, this token is saved in local storage on login to be used by the APIs on the frontend to call to the backend. If that token is non existant the API calls to the backend will fail with a verifification failure.

Routes are protected through an 'isAuthenticated' flag. If that user is not logged in they cannot access the protected routes and the web page will not display. The need for a bearer token to access the API is doubly protected as if the user is not logged in they will not have a verifyable token to access the API regardlesss

## Integrating with React App

Describe how you integrated your React app with the API. List the views that use your Web API instead of the TMDB API. Describe any other updates to the React app from Assignment One.
The integration to the application for the calls to TMDB was quite seamless as I ensured all the information passed back from the backend was the same as the frontend expected before. I just needed to set up the login to provide the neccessary bearer token
Home
Upcoming
Now Playing
Favourite
Latest
Movie Details
Popular Actors
Actor Details
Reviews
