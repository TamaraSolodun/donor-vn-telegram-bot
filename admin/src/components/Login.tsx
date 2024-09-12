import React, { useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { StyledButton, StyledContainer, StyledContainerHeader } from '../styles/App.styled';
import { TextField, Typography, Stack } from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setAccessToken, setRefreshToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:8000';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData: any = await response.json();
        setErrorMessage(errorData.message || "Authentication failed.");
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return;
      }

      const data: any = await response.json();
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setAccessToken(null);
      setRefreshToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <StyledContainer sx={{ width: '50%', mb: 2 }}>
      <StyledContainerHeader>Login to Donor Vn</StyledContainerHeader>
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Stack spacing={2} direction="row" justifyContent="space-around" sx={{ mt: 3 }}>
          <StyledButton type="submit">Login</StyledButton>
        </Stack>
      </form>
    </StyledContainer>
  );
};

export default Login;
