import React from 'react';
import { connect } from 'react-redux';
import {add} from '../Redux/Actions'
import {songs} from './songs.jsx'

const Songs = props => {
  console.log(props)
  return (
    <div className="App">
      {songs.map(song => song.BPM == props.BPM ? (
        <>
        <h1>{song.title} </h1>
        <h2>By: {song.artist} </h2>
        <h3>{song.BPM} </h3>
        <button onClick={() => {props.add({Title: song.title, Artist: song.artist, BPM: song.BPM})}}> Add to playlist</button>
        </>
      ) : null)}
      
    </div>
  );
}

function mapStateToProps(state) {
  return {

  }
}

const mapDispatchToProps = {
add
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Songs);
