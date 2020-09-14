import React, { useEffect } from 'react'


export default function Token(props) {

    const oauthurl = 'https://accounts.spotify.com/authorize?client_id=e267603f9e134b8fb70748a97dbc30a5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmusic&scope=user-read-private%20user-read-email&response_type=token'
    const spotifyToken = localStorage.getItem('spotify-token')


    useEffect(() => {
        const access_token = new URLSearchParams(window.location.hash).get('#access_token')
        console.log(access_token)
        localStorage.setItem('spotify-token', access_token)
    })

    useEffect(() => {
        spotifyToken == undefined ? window.location.href = oauthurl : window.location.href = 'http://localhost:3000/map'
    }, [spotifyToken])

    return (null)
}