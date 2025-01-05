import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../utils/api.functions";
import { UserContext } from "../../utils/userContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginDataErrors, setLoginDataErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) return navigate("/");
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("username"), data.get("password"))
      .then((user) => {
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        setLoginDataErrors({
          ...error?.response?.data.errors,
          message: error?.response?.data.message,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoFocus
          />
          <p style={{ color: "red" }}>{loginDataErrors.username}</p>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <p style={{ color: "red", textAlign: "center" }}>
            {loginDataErrors.password}
          </p>
          <p style={{ color: "red", textAlign: "center" }}>
            {loginDataErrors.message}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
