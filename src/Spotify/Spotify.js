import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlayList from '../song/PlayList'



export default function Spotify(){
    const [spotifyID, setSpotifyID] = useState('')
    const [playlistTitle, setPlaylistTitle] = useState('')


    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', {headers: {"Authorization" : 'Bearer ' + localStorage.getItem('spotify-token')}})
        .then(res => {localStorage.setItem('spotify-id', res.data.id)})
        .then(setSpotifyID(localStorage.getItem('spotify-id')))
        .catch(err => {console.log(err)})

    }, [])

    function CreatePlalist(){
        console.log(playlistTitle)
        fetch(`https://api.spotify.com/v1/users/${spotifyID}/playlists`, {method: 'post',  body: JSON.stringify({name: playlistTitle, public: false}), headers: {"Authorization" : 'Bearer ' + localStorage.getItem('spotify-token')}})
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {console.log(err)})
    }


    const handleChange = e => {
        setPlaylistTitle(e.target.value)
    }
    return(
        <>
        <input name="Playlist-title" value={playlistTitle} onChange={handleChange} />
        <button onClick={() => {CreatePlalist()}}> Create New Playlist</button>
        <PlayList />
        </>
    )
}