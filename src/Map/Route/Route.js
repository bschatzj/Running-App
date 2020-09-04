import { connect } from 'react-redux';
import { startRoute, addRoute, search, getArtist, getAlbum, add, reorder } from '../../Redux/Actions'
import React, { useEffect, useState, useRef } from 'react';
import Playlist from './PlayList'
import './songs.css'


function Route(props) {
    const timeInput = useRef(null)
    console.log(props)
    const [search, setSearch] = useState({
        search: "",
        type: "artist"
    })
    const [pace, setPace] = useState({
        numeric: 0,
        display: new Date(0 * 1000).toISOString().substr(11, 8),
        unit: "Minute_Per_Mile"
    })
    let points = props.Route.wayPoints
    const [totalDistance, setTotalDistance] = useState(0)

    function handleFocus() {
        timeInput.current.focus()
    }

    function distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    function totalTime(seconds, distance) {
        let secs = (seconds * distance) % 1
        let minutes = (seconds * distance) - secs
        let total = seconds * distance
        console.log('time', (minutes, secs, total))
        return (minutes, secs, total)
    }

    useEffect(() => {
        console.log(props)
        setTotalDistance(0)
        points = points.sort(function (a, b) {
            return (a.id - b.id);
        });

        if (points.length > 1) {
            for (let i = 0; i + 1 < points.length; i++) {
                let distances = distance(points[i].cords[1], points[i].cords[0], points[i + 1].cords[1], points[i + 1].cords[0])
                setTotalDistance(totalDistance => (totalDistance + distances))
            }
        }
    }, [props])


    useEffect(() => {
        totalTime()
    })

    const handleChange = e => {
        console.log(search)
        setSearch({ ...search, [e.target.name]: e.target.value.toLowerCase() })
    }

    const handleTime = e => {
        setPace({ ...pace, numeric: e.target.value, display: new Date(e.target.value * 1000).toISOString().substr(11, 8) })
    }

    const handleSelect = e => {
        setPace({ ...pace, unit: e.target.value })
    }

    return (
        <>
            <div className="SongsContainer">
                <div className="LTR">
                    <h1 style={{ margin: "0" }}>Total Miles: {totalDistance}</h1>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ width: "50%" }} onClick={handleFocus}>{pace.display}</h1>
                        <input ref={timeInput} value={pace.numeric} name="numeric" type="number" onChange={handleTime} style={{ position: "absolute", zIndex: -10, color: 'white', padding: '10px', width: "30%", }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <select value={pace.unit} onChange={handleSelect}>
                            <option value="MPM">Minutes Per Mile</option>
                            <option value="TT">Total Time</option>
                        </select>
                    </div>
                </div>
                <div className="Form">
                    <input name="search" onChange={handleChange} value={search.search} />
                    <select name="type" onChange={handleChange} value={search.type}>
                        <option value="artist">Artist</option>
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                    </select>
                    <button onClick={() => { props.search(search.search, search.type) }}>Search</button>
                </div>
                {props.searchComplete && props.Spotify.data.artists ? <>{props.Spotify.data.artists.items.map((artist) => (

                    <div className="SongDiv">
                        {artist.images[0] ? <img src={artist.images[0].url} style={{ width: "90%" }} /> : <h1>No Image...</h1>}
                        <h1 onClick={() => { props.getArtist(artist.id) }}>{artist.name}</h1>
                    </div>
                ))} </> : null}

                {props.searchComplete && props.Spotify.data.tracks ? <>{props.Spotify.data.tracks.items ? props.Spotify.data.tracks.items.map((track) => (

                    <div className="SongDiv">
                        <h1>{track.name}</h1>
                        <audio src={track.preview_url} controls={true} />
                        {track.artists.map(artist => (
                            <h1 onClick={() => { props.getArtist(artist.id) }}>Artist: {artist.name}</h1>
                        ))}
                        <button onClick={() => { props.add(track) }}> Add to Playlist </button>
                    </div>
                )) :

                    props.Spotify.data.tracks.map((track) => (

                        <div className="SongDiv">
                            <h1>{track.name}</h1>
                            <audio src={track.preview_url} controls={true} />
                            {track.artists.map(artist => (
                                <h1 onClick={() => { props.getArtist(artist.id) }}>Artist: {artist.name}</h1>
                            ))}
                            <button onClick={() => { props.add(track) }}> Add to Playlist </button>
                        </div>))} </> : null}

                {props.searchComplete && props.Spotify.data.albums ? <>{props.Spotify.data.albums.items.map((album) => (

                    <div className="SongDiv">
                        {album.images[0] ? <img src={album.images[0].url} style={{ width: "90%" }} /> : <h1>No Image...</h1>}
                        <h1 onClick={() => { props.getAlbum(album.id) }}>{album.name}</h1>
                        {album.artists.map(artist => (
                            <h1 onClick={() => { props.getArtist(artist.id) }}>Artist: {artist.name}</h1>
                        ))}
                    </div>
                ))} </> : null}

                {props.searchComplete && props.Spotify.data.items ? props.Spotify.data.items.map((track) => (
                    <div className="SongDiv">
                        <h1>{track.name}</h1>
                        <audio src={track.preview_url} controls={true} />
                        {track.artists.map(artist => (
                            <h1 onClick={() => { props.getArtist(artist.id) }}>Artist: {artist.name}</h1>
                        ))}
                        <button onClick={() => { props.add(track) }}> Add to Playlist </button>
                    </div>
                )) : null
                }

            </div>

            <Playlist data={props.PlayList} reorder={props.reorder} />

        </>
    )
}


const mapStateToProps = (state) => ({
    Route: state.route,
    Spotify: state.spotify,
    Searching: state.searching,
    searchComplete: state.searchComplete,
    PlayList: state.playList
});

const mapDispatchToProps = {
    startRoute,
    addRoute,
    search,
    getArtist,
    getAlbum,
    add,
    reorder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);