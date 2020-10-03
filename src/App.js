import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom'
import Run from './fitbit/runData';
import { songs } from './song/songs.jsx';
import Token from './fitbit/token';
import HeartRate from './GraphStuff/heartRate';
import Spotify from './spotifyAuth/SpotifyLogin';
import SpotifyToken from './spotifyAuth/SpotifyToken';
import SpotifySongs from './Spotify/Spotify';
import Map from './Map/Map';
import Home from './Home/Home.js'
import AboutPage from './About/About';
import Login from './Login/Login'
import Register from './Login/Register'
import Profile from './Profile/Profile'



function App() {
  const [time, setTime] = useState()

  useEffect(() => {
    setTime(Date.now());
    console.log(time)
  }, [])

  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth"><Run /></Route>
      <Route path="/fitbit" component={Token} />
      <Route path="/heart" component={HeartRate} />
      <Route path='/graph' component={Date} />
      <Route path="/spotify" component={Spotify} />
      <Route path="/music" component={SpotifyToken} />
      <Route path='/hi' component={SpotifySongs} />
      <Route path='/map' component={Map} />
      <Route path='/about' component={AboutPage} />
    </>
  );
}

export default App;
