import React from 'react'
import './Home.css'
import HeartBeat from './HeartBeat.js'
import { useHistory } from "react-router-dom";

export default function Home() {
    const History = useHistory()


    return (

        <div className="top">
            <h1 className="welcome">Welcome to Running Jamz</h1>
            <div className="HomeButtonContain">
                <button className="HomeButton" onClick={() => { History.push('/about') }}>More Info</button>
                <button className="HomeButton" onClick={() => { History.push('/spotify') }}>Get Started</button>
            </div>
            <HeartBeat />
        </div>
    )
}