import React, {useEffect, useState} from 'react'
import axios from 'axios'


export default function RunData(){

    const oauthurl = 'https://www.fitbit.com/oauth2/authorize?scope=activity%20heartrate%20location%20profile&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit&client_id=22BTV8'
    console.log(oauthurl);
    useEffect(() => {
        window.location.href = oauthurl
    }, [])
    return (
        null
    )
}