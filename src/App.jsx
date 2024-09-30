import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const App = () => {
  const handleClick = () => {
    alert('¡Hola, mundo!');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Mi Aplicación Sencilla
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Haz clic aquí
      </Button>
    </Container>
  );
};

export default App;
