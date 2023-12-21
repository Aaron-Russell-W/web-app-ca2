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
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
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
      <AuthContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
          <Routes>
  <Route path="/" element={<LoginFunc />} />
  <Route path="/home" element={<HomePage />} />
  <Route element={<ProtectedRoutes />}>
    <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
    <Route path="/movies/:id" element={<MoviePage />} />
    <Route path="/reviews/form" element={<AddMovieReviewPage />} />
    <Route path="/reviews/:id" element={<MovieReviewPage />} />
    <Route path="/movies/nowplaying" element={<NowPlayingPage />} />
    <Route path="/actors/popular" element={<PopularActorsPage />} />
    <Route path="/actors/:id" element={<ActorDetails />} />
    <Route path="/movies/upcoming" element={<UpcomingPage />} />
  </Route>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);