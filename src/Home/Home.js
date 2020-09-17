import React from 'react'
import './Home.css'
import HeartBeat from './HeartBeat.js'

export default function Home() {



    return (

        <div className="top">
            <h1 className="welcome">Welcome to Running Jamz</h1>
            <div className="HomeButtonContain">
                <button className="HomeButton">More Info</button>
                <button className="HomeButton">Log In</button>
                <button className="HomeButton">Sign Up</button>
            </div>
            <HeartBeat />
        </div>
    )
}