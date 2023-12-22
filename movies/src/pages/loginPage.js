import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";
import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';

const LoginPage = props => {
    const context = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store the error message

    const login = async () => {
        try {
            await context.authenticate(userName, password);
        } catch (e) {
            setError(e.message); // Set the error message
        }
    };

    let location = useLocation();
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated) {
        return <Navigate to={from} />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={8}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoFocus
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={login}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Log In
                </Button>
                <Link to="/signup">
                    {"Don't have an account? Sign Up"}
                </Link>
            </Box>
        </Container>
    );
};

export default LoginPage;
