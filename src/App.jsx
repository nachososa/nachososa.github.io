import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Typography, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import '@fontsource/open-sans';

const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#002d3c',
    },
    secondary: {
      main: '#00a0f0',
    },
    background: {
      default: '#002d3c',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Open Sans, Arial, sans-serif',
  },
};

const theme = createTheme(themeOptions);

const formatDateDay = () => {
  const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' });
  return date.charAt(0).toUpperCase() + date.slice(1);
};

const formatDateMonthYear = () => {
  const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  return date.charAt(0).toUpperCase() + date.slice(1);
};

const App = () => {
  const [time, setTime] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);  // Guardamos en m/s y convertimos a km/h
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('Tierra del Fuego'); // Guardamos en m/s y convertimos a km/h
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = '65afa1f603a10081bdfe403f3adc055c';
      {/*
            Mar del Plata
            const lat = -38.0024;
            const lon = -57.5587;
                */}

      const lat = -54.8019;
      const lon = -68.3030;


      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Datos de clima no disponibles');
        }
        const data = await response.json();
        if (data.main) {
          setTemperature(data.main.temp);
          setMinTemperature(data.main.temp_min);
          setMaxTemperature(data.main.temp_max);
          setHumidity(data.main.humidity);
          setPressure(data.main.pressure);
          setWindSpeed(data.wind.speed * 3.6); // Convertimos de m/s a km/h
          setCity(data.name);
          setWeatherDescription(data.weather[0].description);
          setWeatherIcon(data.weather[0].icon);
        } else {
          throw new Error('No se encontró información de la ciudad');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const formatTime = () => time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth={false}
        sx={{
          width: '640px',
          height: '720px',
          padding: 0,
        }}
      >
        <Grid container sx={{ height: '100%' }}>

          {/* Fila 1 - Hora y Fecha */}
          <Grid
            item
            xs={12}
            sx={{
              height: '20%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              width: '100%',
            }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="div" sx={{ fontSize: '30px', display: 'block' }} >{formatDateDay()}</Typography>
              <Typography variant="div" sx={{ fontSize: '15px' }}>{formatDateMonthYear()}</Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontSize: '42px' }}>{formatTime()}</Typography>
          </Grid>

          {/* Fila 2 - Temperaturas Mínima y Máxima */}
          <Grid
            item
            xs={12}
            sx={{
              height: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '0px',
              borderTop: '1px solid rgba(255, 255, 255, 0.4)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
              borderRight: '1px solid rgba(255, 255, 255, 0.4)',
              borderTopLeftRadius: '18px',
              borderTopRightRadius: '18px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}>
            {loading ? (
              <Typography variant="p" sx={{ fontSize: '27px' }}>Cargando...</Typography>
            ) : error ? (
              <Typography variant="p" sx={{ fontSize: '27px' }} color="error">{error}</Typography>
            ) : (
              <Typography variant="p" sx={{ fontSize: '30px' }}>
                Min: {minTemperature !== null ? `${minTemperature.toFixed(1)}°` : 'Sin datos'} | Max: {maxTemperature !== null ? `${maxTemperature.toFixed(1)}°` : 'Sin datos'}
              </Typography>
            )}
          </Grid>

          {/* Fila 3 - Temperatura y Ciudad */}
          <Grid
            item
            xs={12}
            sx={{
              height: '40%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              width: '100%',
              borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
              borderRight: '1px solid rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}>
            {loading ? (
              <Typography variant="p" sx={{ fontSize: '30px' }} >Cargando...</Typography>
            ) : error ? (
              <Typography variant="p" sx={{ fontSize: '30px' }} color="error">{error}</Typography>
            ) : (
              <>
                <Typography variant="p" sx={{ fontSize: '150px', fontWeight: 900 }}>
                  {temperature !== null ? `${temperature.toFixed(1)}°` : 'Sin datos'}
                </Typography>
                <Typography variant="p" sx={{ fontSize: '30px' }}>{`${city}, ${province}.`}</Typography>
              </>
            )}
          </Grid>

          {/* Fila 4 - Icono y Estado del Clima */}
          <Grid
            item
            xs={12}
            sx={{
              height: '15%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px',
              width: '100%',
              borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
              borderRight: '1px solid rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',

            }}>
            {loading ? (
              <Typography variant="p" sx={{ fontSize: '30px' }}>Cargando...</Typography>
            ) : error ? (
              <Typography variant="p" sx={{ fontSize: '30px' }} color="error">{error}</Typography>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {weatherIcon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                    alt={weatherDescription}
                    style={{ width: '120px', height: '120px', }}
                  />
                )}
                <Typography variant="p" sx={{ fontSize: '30px' }}>{weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</Typography>
              </Box>
            )}
          </Grid>

          {/* Fila 5 - Humedad, Presión y Viento */}
          <Grid
            item
            xs={12}
            sx={{
              height: '10%',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: '0px',
              width: '100%',
              borderLeft: '1px solid rgba(255, 255, 255, 0.4)',
              borderRight: '1px solid rgba(255, 255, 255, 0.4)',
              borderBottomLeftRadius: '18px',
              borderBottomRightRadius: '18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',


            }}>
            {loading ? (
              <Typography variant="p" sx={{ fontSize: '27px' }}>Cargando...</Typography>
            ) : error ? (
              <Typography variant="p" sx={{ fontSize: '27px' }} color="error">{error}</Typography>
            ) : (
              <>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="p" sx={{ fontSize: '21px', fontWeight: 'bold' }}>
                    {humidity !== null ? `${humidity}%` : 'Sin datos'}
                  </Typography>
                  <Typography variant="p" sx={{ fontSize: '15px', textTransform: 'uppercase' }}>
                    Humedad
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="p" sx={{ fontSize: '21px', fontWeight: 'bold' }}>
                    {pressure !== null ? `${pressure} hPa` : 'Sin datos'}
                  </Typography>
                  <Typography variant="p" sx={{ fontSize: '15px', textTransform: 'uppercase' }}>
                    Presión
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="p" sx={{ fontSize: '21px', fontWeight: 'bold' }}>
                    {windSpeed !== null ? `${windSpeed.toFixed(1)} km/h` : 'Sin datos'}
                  </Typography>
                  <Typography variant="p" sx={{ fontSize: '15px', textTransform: 'uppercase' }}>
                    Viento
                  </Typography>
                </Box>
              </>
            )}
          </Grid>


        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
