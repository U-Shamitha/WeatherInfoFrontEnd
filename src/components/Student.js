import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { Container, Paper, Button, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import './Student.css'
import { auto } from '@popperjs/core';




export default function Student() {

  //styles
  const paperStyle={padding:'20px 20px', width:'60%', margin:"20px auto"}  
  
  const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


  const server = "https://weatherinfobackend.onrender.com"

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    console.log(location);
    //api call
    axios.get(`${server}/weather?city=${location}`)
    .then((result )=> {
        console.log(result.data);
        setWeather(result.data);
    })
  }

  return (
  <Container>
    <Box
      component="form"
    sx={{
        '& > :not(style)': { m: 1, },
    }}
      noValidate
      autoComplete="off"
    >
        <Paper elevation={3} style={paperStyle} >
            <p style={{color: '#004de6', fontSize:'4vmin',fontFamily:'sans-serif', marginBottom:'30px'}}>Get weather details of any city</p>
            <TextField id="outlined-basic" label="Location" variant="outlined" fullWidth 
            style={{marginBottom:'30px'}} 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="contained" color='primary' onClick={handleSearch} sx={{fontSize:'1.5vmin',fontFamily:'monospace'}}>Search</Button>
        </Paper>

        {weather && (
        <Paper elevation={3} style={paperStyle}>
            <center>
            <Grid item xs={12} sx={{color: '#004de6', fontSize:'4vmin',marginBottom:'45px'}}>
                Current weather details
            </Grid>
            <Grid container spacing={2} columns={15} sx={{width:'50vmin', textAlign:'left'}}>
                <center>
                <Grid container item   spacing={2} sx={{textAlign:'left', marginLeft:'5vmax'}}>
                    <Grid item xs={14} md={6} >  <b>Location</b>  </Grid>
                    <Grid item xs={14} md={5} >  {weather.name}   </Grid>

                    <Grid item xs={14} md={6}>  <b>Condition</b>  </Grid>
                    <Grid item xs={14} md={5}>  {weather.weather[0].main}   </Grid>

                    <Grid item xs={14} md={6}>  <b>Description</b>  </Grid>
                    <Grid item xs={14} md={5}>  {weather.weather[0].description}   </Grid>

                    <Grid item xs={14} md={6}>  <b>Temperature</b>  </Grid>
                    <Grid item xs={14} md={5}>  {weather.main.temp}°C   </Grid>

                    <Grid item xs={14} md={6}>  <b>Humidity</b>  </Grid>
                    <Grid item xs={14} md={5}>  {weather.main.humidity}   </Grid>

                    <Grid item xs={14} md={6}>  <b>Pressure</b>  </Grid>
                    <Grid item xs={14} md={5}>  {weather.main.pressure}   </Grid>
            
                </Grid></center>

            </Grid>
            </center>
        
        </Paper>
        )}
    </Box>
   </Container>
    
  );
}
