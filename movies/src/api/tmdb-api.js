export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getGenres = async () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_TMDB_KEY +
      "&language=en-US"
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
 });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
  .then((res) => res.json())
  .then((json) => {
      return json.results;
  });
};
/*
export const getUpcomingMovies = () => {
  return fetch(
    'http://localhost:8080/api/movies/tmdb/upcoming'
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.json().message);
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
*/
export const getUpcomingMovies = () => {
  // Replace 'YOUR_BEARER_TOKEN' with the actual token value
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzAzMDA1MzkxfQ.CciCtvkhk0fWSG4tOBDVW6v5BAXFVGUcNFa0ZFC9DQo';

  return fetch('http://localhost:8080/api/movies/tmdb/upcoming', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    if (!res.ok) {
      return res.json().then(json => { throw new Error(json.message); });
    }
    return res.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getNowPlayingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => {
      if (!res.ok) {
        return res.json().then(json => { throw new Error(json.message) });
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Parameterised Endpoint
export const getMovieWatchProviders = ({queryKey}) => {
  const[,idPart]=queryKey
  const { id } = idPart
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        return res.json().then(json => { throw new Error(json.message) });
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
// Static Endpoint
export const getPopularActors = () => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  )
    .then((res) => {
      if (!res.ok) {
        return res.json().then(json => { throw new Error(json.message) });
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
// Parameterised Endpoint
export const getActorMovieCredits = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
    .then((res) => {
      if (!res.ok) {
        return res.json().then(json => { throw new Error(json.message) });
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
// Parameterised Endpoint
export const getActorDetails = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  )
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  })
  .catch(error => {
    throw error;
  });

};

//Parameterised Endpoint
export const getMovieCast = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  console.log("Fetching cast for movie ID:", id); // For debugging

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
  .then(res => {
    if (!res.ok) {
      return res.json().then(json => { 
        throw new Error(json.message || 'Network response was not ok');
      });
    }
    return res.json();
  })
  .catch(error => {
    throw error;
  });
};
// Static Endpoint
export const getLatestMovie = () => {
  return fetch(
    "https://api.themoviedb.org/3/movie/latest?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US",
    {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
        'accept': 'application/json'
      }
    }
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};