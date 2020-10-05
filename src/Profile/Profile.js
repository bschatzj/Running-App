import React, { useEffect, useState } from 'react'
import './Profile.css'
import { axiosWithAuth } from "../Utils/AxiosWithAuthBack.js";
import SpotifyAxios from '../Utils/AxiosWithAuth'
import PlayList from '../Map/Route/PlayList';
import { set } from 'animejs';

export default function Profile() {

    const [profile, setProfile] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [playListTitle, setPlaylistTitle] = useState("")
    const [open, setOpen] = useState("")
    useEffect(() => {

        SpotifyAxios()
            .get(`/users/${localStorage.getItem('spotify-id')}/playlists`)
            .then(res => {
                console.log(res)
                setPlaylists(res.data.items)
            })
            .catch(err => { console.log(err) })


        axiosWithAuth()
            .get('/profile')
            .then(res => {
                console.log(res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleTitle = e => {
        setPlaylistTitle(e.target.value)
    }

    function CreatePlalist() {
        fetch(`https://api.spotify.com/v1/users/${localStorage.getItem('spotify-id')}/playlists`, { method: 'post', body: JSON.stringify({ name: playListTitle, public: true }), headers: { "Authorization": 'Bearer ' + localStorage.getItem('spotify-token') } })
            .then(res => res.json())
            .then(res => { setPlaylists([...playlists, res]) })
            .then(setPlaylistTitle(""))
            .catch(err => { console.log(err) })
    }



    return (
        <div className="ProfilePage">
            <div>
                <input placeholder="Playlist Title" onChange={handleTitle} value={playListTitle} />

                <button onClick={() => CreatePlalist()}>Save</button>
            </div>

            <div>
                My Past Routes

            </div>
            <div>
                My Playlists
                {playlists.length > 0 ? <> {
                    playlists.map(playlist => (
                        <div id={playlist.name} className={playlist.name == open ? "PlaylistDiv" : "PlaylistDivClosed"}>
                            <h1>{playlist.name}</h1>

                            {playlist.name == open ?
                                <>
                                    <h1>hi</h1>
                                    <h1>HI!!! </h1>
                                    <button className="PlaylistButton" onClick={() => { setOpen("") }}> Show Less</button>

                                </>

                                : <button className="PlaylistButton" href={"#" + playlist.name} onClick={() => { setOpen(playlist.name) }}>Show More</button>
                            }
                        </div>
                    ))
                } </> : <h1>You have no playlists!</h1>}
            </div>
        </div>
    )
}