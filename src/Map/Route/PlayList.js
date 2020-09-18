import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { connect } from 'react-redux';
import { reorder, createPlaylist } from '../../Redux/Actions'
import axios from 'axios'


function App(props) {

    const [playListTitle, setPlaylistTitle] = useState("")
    const [state, setState] = useState({
        "playlist": {
            title: "Current Playlist",
            items: []
        }
    })
    const [spotifyID, setSpotifyID] = useState('')



    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', { headers: { "Authorization": 'Bearer ' + localStorage.getItem('spotify-token') } })
            .then(res => { localStorage.setItem('spotify-id', res.data.id) })
            .then(setSpotifyID(localStorage.getItem('spotify-id')))
            .catch(err => { console.log(err) })

    }, [])

    const handleTitle = e => {
        setPlaylistTitle(e.target.value)
    }




    function CreatePlalist() {
        fetch(`https://api.spotify.com/v1/users/${spotifyID}/playlists`, { method: 'post', body: JSON.stringify({ name: playListTitle, public: false }), headers: { "Authorization": 'Bearer ' + localStorage.getItem('spotify-token') } })
            .then(res => res.json())
            .then(data => createPlaylist(data.id, playListTitle))
            .catch(err => { console.log(err) })
    }


    console.log(state.playlist)
    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = { ...state[source.droppableId].items[source.index] }

        setState(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }

    const addItem = (song) => {
        setState(prev => {
            return {
                ...prev,
                playlist: {
                    title: "Current Playlist",
                    items: [
                        ...prev.playlist.items,
                        {
                            id: v4(),
                            name: song.name,
                            length: song.duration_ms ? song.duration_ms : song.length,
                            spotify_id: song.id,
                        },

                    ]
                }
            }
        })
    }


    useEffect(() => {
        setState({
            "playlist": {
                title: "Current Playlist",
                items: []
            }
        })
        props.PlayList.map((song) => {
            addItem(song)
        })
    }, [props])


    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div className="Playlist">
            <input placeholder="Playlist Title" onChange={handleTitle} value={playListTitle} />
            <h1>{playListTitle}</h1>
            <button onClick={() => CreatePlalist()}>Save</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                    return (
                        <div key={key} className={"column"}>
                            <h3>{data.title}</h3>
                            <Droppable droppableId={key}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={"droppable-col"}
                                        >
                                            {data.items.map((el, index) => {
                                                return (
                                                    <Draggable key={el.id} index={index} draggableId={el.id}>
                                                        {(provided, snapshot) => {

                                                            return (
                                                                <div
                                                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <div className="PlayListSong">
                                                                        <h3>{el.name}</h3>
                                                                        <h4>{millisToMinutesAndSeconds(el.length)}</h4>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}

const mapStateToProps = (state) => ({
    PlayList: state.playList,
    PlayListTitle: state.playListTitle,
    PlayListID: state.playListID
});

const mapDispatchToProps = {
    reorder,
    createPlaylist
};

export default connect(mapStateToProps, mapDispatchToProps)(App);