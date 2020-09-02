import React from 'react';
import { connect } from 'react-redux';
import { add } from '../Redux/Actions'
import { songs } from './songs.jsx'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Song = styled.div`
display: flex;
width: 80vw;
margin-left: 10vw;

`

const Header = styled.h1`
width: 25%;
border-bottom: 2px solid black;
`

const Info = styled.h1`
width: 25%;
`

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const PlayList = props => {

  let i = 1
  const initial = props.playList.map(song => {
    const addedSong = {
      id: i,
      content: song.Title,
    }
    i = i++
    return addedSong
  })
  return (
    <DragDropContext >
      <div className="App">

        <Song>
          <Header>Order</Header>
          <Header>Title </Header>
          <Header>Artist</Header>
          <Header>Beats Per Minute </Header>
        </Song>
        {/* <Droppable> */}
          <div>
            {props.playList.map(song => (
              // <Draggable draggableId={props.playList.indexOf(song)} index={props.id} >
                <Song>
                  <Info>{props.playList.indexOf(song) + 1}</Info>
                  <Info>{song.Title} </Info>
                  <Info>By: {song.Artist} </Info>
                  <Info>{song.BPM} </Info>
                </Song>
              // </Draggable>
            ))}
          </div>
        {/* </Droppable> */}

      </div>
    </ DragDropContext>
  );
}

function mapStateToProps(state) {
  return {
    playList: state.playList
  }
}

const mapDispatchToProps = {
  add
}



export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (PlayList);
