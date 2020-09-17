import React, { useEffect } from 'react'
import anime from 'animejs'
import "./Heart.css"

export default function HeartBeat() {

    return (

        <div className="container">
            <svg xmlns="http://www.w3.org/2000/svg">
                <path d="M60, 200 L500,200
				 L510,160 L520,340
				 L535,100 L545,220
				 L560,200 L650,200
				 L660,160 L670,340
				 L685,100 L695,220
				 L715,200 L1200,200"
                    style={{
                        stroke: "red",
                        strokeWidth: 5,
                        fill: "none",

                    }}
                />
            </svg>
        </div>
    )
}