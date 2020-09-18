import React from 'react'
import './About.css'
import { useHistory } from "react-router-dom";

export default function AboutPage() {

    const History = useHistory()

    return (
        <div className="AboutPage">
            <h1 className="AboutTitle">About</h1>
            <div className="AboutContainer">
                <h2 className="AboutDescription">  Hi, <br /> <br />
                    My name is Brendan Schatz. I am a runner and I have to listen to music when I run. I realized that my heart rate is consistently matching the BPM of the music. I wanted a way to get my heart rate from a run and then use it to make a play list for future runs. Please connect to fitbit and spotify and give it a try.
                </h2>
                <button onClick={() => { History.push('/spotify') }}>Spotify</button>
                <button onClick={() => { History.push('/fitbit') }}>Spotify</button>
            </div>
        </div>
    )
}