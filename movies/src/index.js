import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingPage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import LoginFunc from "./components/loginPage";
import NowPlayingPage from "./pages/nowPlayingMoviesPage";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorDetails from "./pages/actorDetailsPage";
import { AuthProvider, ProtectedRoute } from "./authHelpers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
          <Routes>
        <Route path="/" element={<LoginFunc />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/movies/favourites" element={<ProtectedRoute><FavouriteMoviesPage /></ProtectedRoute>} />
        <Route path="/movies/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
        <Route path="/reviews/form" element={<ProtectedRoute><AddMovieReviewPage /></ProtectedRoute>} />
        <Route path="/reviews/:id" element={<ProtectedRoute><MovieReviewPage /></ProtectedRoute>} />
        <Route path="/movies/upcoming" element={<ProtectedRoute><UpcomingPage /></ProtectedRoute>} />
        <Route path="/movies/nowplaying" element={<ProtectedRoute><NowPlayingPage /></ProtectedRoute>} />
        <Route path="/actors/popular" element={<ProtectedRoute><PopularActorsPage /></ProtectedRoute>} />
        <Route path="/actors/:id" element={<ProtectedRoute><ActorDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);