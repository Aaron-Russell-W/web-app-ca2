import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
        );

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getNowPlayingMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`);
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieWatchProviders = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getPopularActors = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getActorMovieCredits = async (actorId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getActorDetails = async (actorId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const getMovieCast = async (movieId) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getLatestMovie = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/latest?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
