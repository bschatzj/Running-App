import React, { useEffect, useState } from 'react'
import './Profile.css'
import { axiosWithAuth } from "../Utils/AxiosWithAuthBack.js";
import SpotifyAxios from '../Utils/AxiosWithAuth'

export default function Profile() {

    const [profile, setProfile] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [playListTitle, setPlaylistTitle] = useState("")
    useEffect(() => {

        SpotifyAxios()
            .get('/me/playlists')
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
        fetch(`https://api.spotify.com/v1/users/${localStorage.getItem('spotify-id')}/playlists`, { method: 'post', body: JSON.stringify({ name: playListTitle, public: false }), headers: { "Authorization": 'Bearer ' + localStorage.getItem('spotify-token') } })
            .then(res => res.json())
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
                        <div>
                            <h1>{playlist.name}</h1>
                        </div>
                    ))
                } </> : <h1>You have no playlists!</h1>}
            </div>
        </div>
    )
}