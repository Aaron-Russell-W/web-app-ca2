export const getUpcomingMovies = () => {
    return fetch(
      'http://localhost:8080/api/movies/tmdb/upcoming'
    )
    .then((res) => res.json())
    .then((json) => {
        return json.results;
    });
  };

console.log(getUpcomingMovies)