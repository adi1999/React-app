// src/pages/homepage/index.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

type User = {
  id: number;
  username: string;
  metamaskKey: string;
};

const HomePage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userString = urlParams.get('user');
  if (!userString) {
    // Handle the case where no user data is present in the URL
    // You can redirect the user back to the login page or display an error message.
    return <div>No user data found. Please login again.</div>;
  }

  const user: User = JSON.parse(decodeURIComponent(userString));

  return (
    <Container>
      <Typography variant="h4">Homepage</Typography>
      <Typography variant="h6">Logged in as: {user.username}</Typography>
      <Typography variant="body1">Metamask Key: {user.metamaskKey}</Typography>
    </Container>
  );
};

export default HomePage;
