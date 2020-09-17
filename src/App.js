import React from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom'
import Run from './fitbit/runData';
import { songs } from './song/songs.jsx';
import Token from './fitbit/token';
import HeartRate from './GraphStuff/heartRate';
import Date from './GraphStuff/Date';
import Spotify from './spotifyAuth/SpotifyLogin';
import SpotifyToken from './spotifyAuth/SpotifyToken';
import SpotifySongs from './Spotify/Spotify';
import Map from './Map/Map';
import Home from './Home/Home.js'
function App() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/auth"><Run /></Route>
      <Route path="/fitbit" component={Token} />
      <Route path="/heart" component={HeartRate} />
      <Route path='/graph' component={Date} />
      <Route path="/spotify" component={Spotify} />
      <Route path="/music" component={SpotifyToken} />
      <Route path='/hi' component={SpotifySongs} />
      <Route path='/map' component={Map} />
    </>
  );
}

export default App;
