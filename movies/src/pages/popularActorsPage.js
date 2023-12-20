import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularActors } from '../api/tmdb-api';
import { useQuery } from 'react-query';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
const PopularActorsPage = () => {
  const { data, isLoading, error } = useQuery('popularActors', getPopularActors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const actors = data.results;


  return (
    <Grid container spacing={2}>
      {actors.map((actor) => (
        <Grid item xs={12} sm={6} md={3} lg={3} key={actor.id}>
          <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none' }}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {actor.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default PopularActorsPage;