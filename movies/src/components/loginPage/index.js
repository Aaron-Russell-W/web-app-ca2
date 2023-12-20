import React from 'react';
import { auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button, Container, Typography, Box, Paper } from '@mui/material';

const LoginFunc = () => {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider).then((result) => {
      navigate('/home');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={signInWithGoogle} 
            style={{ marginTop: '20px' }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginFunc;