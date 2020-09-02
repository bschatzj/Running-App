import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function RunData(){

    const oauthurl = 'https://accounts.spotify.com/authorize?client_id=e267603f9e134b8fb70748a97dbc30a5&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmusic&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20user-library-read&response_type=token'
    console.log(oauthurl);
    useEffect(() => {
        window.location.href = oauthurl
    }, [])
    return (
        <div></div>
    )
}