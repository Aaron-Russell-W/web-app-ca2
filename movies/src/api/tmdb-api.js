const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNzAzMDA1MzkxfQ.CciCtvkhk0fWSG4tOBDVW6v5BAXFVGUcNFa0ZFC9DQo';
export const getMovies = () => {
  return fetch('http://localhost:8080/api/movies/tmdb/movies',{
    headers:{
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getGenres = async () => {
  return fetch("http://localhost:8080/api/movies/tmdb/genres",{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/images`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getMovieReviews = (id) => {
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then((res) => res.json())
  .then((json) => {
      return json.results;
  });
};


export const getUpcomingMovies = () => {
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
  return fetch('http://localhost:8080/api/movies/tmdb/movies/now_playing', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/watch/providers`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
  
  return fetch('http://localhost:8080/api/movies/tmdb/actors/popular', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
  return fetch(`http://localhost:8080/api/movies/tmdb/actor/${actorId}/movie_credits`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
  return fetch(`http://localhost:8080/api/movies/tmdb/actor/${actorId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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

  return fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/cast`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
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
  return fetch("http://localhost:8080/api/movies/tmdb/movie/latest", {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
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

