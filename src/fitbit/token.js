import React, { useEffect } from 'react';
import axios from 'axios'

function Token(props) {
    console.log(props.location.search.slice(6))
    const id = props.location.search.slice(6)
    const oauthurl = 'https://www.fitbit.com/oauth2/authorize?scope=activity%20heartrate%20location%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit&client_id=22BTV8'
    
    
    useEffect(() => {

        fetch(`https://api.fitbit.com/oauth2/token?code=${id}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit&expires_in=31536000`,{ method: 'post', headers:{ "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic MjJCVFY4OmNlMDE4YjNjYTMzODdiMTBjODBmM2IwMmVlOTdlYzdl" } })
        .then(response => response.json())
        .then(data => localStorage.setItem("fitbit token",data.access_token));

    }, [])

    const fitbitToken = localStorage.getItem('fitbit token')
    
    useEffect(() => {
        fitbitToken == undefined ?  window.location.href = oauthurl : window.location.href = 'http://localhost:3000/graph'
    }, [fitbitToken])


    return (
        null
    );
}

export default Token;
