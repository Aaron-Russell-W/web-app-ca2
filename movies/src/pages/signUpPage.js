import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Container, TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';

const SignUpPage = props => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (validPassword && password === passwordAgain) {
      context.register(userName, password).then(() => {
        setRegistered(true);
      }).catch(e => {
        setError(e.message); // Assuming e.message contains a readable error message
      });
    } else {
      setError("Invalid password or passwords do not match.");
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: '20px', marginTop: '20px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Alert severity="error" style={{ width: '100%', marginBottom: '20px' }}>{error}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoFocus
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordAgain"
            label="Repeat Password"
            type="password"
            id="passwordAgain"
            value={passwordAgain}
            onChange={e => setPasswordAgain(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={register}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
