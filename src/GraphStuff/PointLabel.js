import React from 'react'
import './song.css'
import styled from 'styled-components'
import Songs from '../song/songDisplay'


const SongDiv = styled.div`
position: fixed;
top: ${(props => props.y - 100)}px;
left: ${props => props.x}px;
width: 500px;
height: 500px;
background-color: white;
border: 5px solid black;
z-index: 1000;
overflow: auto;

`

const X = styled.h1`
position: fixed;
top: ${(props => props.y - 100)}px;
left: ${props => props.x}px;
font-size: 4rem;
margin-top: 0;
margin-left: .5rem;
`



export default function SongSelect(props) {
    console.log(props)


    return(
        <SongDiv x={props.x} y={props.y}>
            <X onClick={() => {props.setActive(false)}}>X</X>
            <Songs BPM={props.bpm} />
        </SongDiv>
    )
}