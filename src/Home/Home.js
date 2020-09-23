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

// import React from 'react'
// import axios from 'axios'
// const { Component, useState, useEffect, useRef } = React

// /*

// Consume the following GET endpoint:
// https://reqres.in/api/unknown?per_page=12
// It will return a JSON object. The data property of that object is an array of colors. 

// Using React:

// - Fetch that endpoint.
// - Render cards in the screen with each color. Each card should at least have the name of the color. The cards (or part of the card's background) should have a background color representing itself (you can use the HEX value). Have fun with it, get as creative as you want. 
// - Make it so that using only CSS, hovering on each card will make them zoom without shifting or moving any adjacent cards.
// - Finally, implement it so that clicking on any card will open a lightbox modal in the center of the page, displaying any more details you want about that color. Clicking outside of the lightbox should close it.
// - If at any point during the exercise you want to break the spec above to get really creative and implement something you really like, please do so. 

// The solution has to use React and only functional components and hooks, no classes.

// - To submit, simply fork this codepen, implement your solution and send it to us via LinkedIn or via email to antonio@usesilo.com.

// */
// const url = 'https://reqres.in/api/unknown?per_page=12'


// function useOnClickOutside(ref, handler) {
//     useEffect(
//         () => {
//             const listener = event => {
//                 // Do nothing if clicking ref's element or descendent elements
//                 if (!ref.current || ref.current.contains(event.target)) {
//                     return;
//                 }

//                 handler(event);
//             };

//             document.addEventListener('mousedown', listener);
//             document.addEventListener('touchstart', listener);

//             return () => {
//                 document.removeEventListener('mousedown', listener);
//                 document.removeEventListener('touchstart', listener);
//             };
//         },
//         [ref, handler]
//     );
// }



// export default function App() {
//     const [colors, setColors] = useState([])
//     const [selected, setSelected] = useState("")


//     const ref = useRef(null)
//     useOnClickOutside(ref, () => setSelected(""));


//     useEffect(() => {
//         axios.get(url)
//             .then(res => {
//                 setColors(res.data.data)
//                 console.log(res)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, [])

//     console.log(selected)
//     return (
//         <div className="colorHolder" >
//             {colors.map(color => (
//                 <div className="ref" ref={ref}>
//                     {selected && selected !== color.id ? null : <div className={color.id == selected ? "selectedColor" : "colorDiv"} onClick={() => { setSelected(color.id) }} style={{ backgroundColor: `${color.color}` }} >
//                         <h1 className="name">{color.name}</h1>
//                     </div>}
//                 </div>
//             ))
//             }
//         </div >
//     )
// }
