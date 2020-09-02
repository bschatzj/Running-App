import { connect } from 'react-redux';
import { startRoute, addRoute, search } from '../../Redux/Actions'
import React, { useEffect, useState } from 'react';


function Route(props) {
    console.log(props)
    let points = props.Route.wayPoints
    const [totalDistance, setTotalDistance] = useState(0)

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

    useEffect(() => {
        setTotalDistance(0)
        points = points.sort(function(a, b) {
            return (a.id - b.id);
        });

        if (points.length > 1) {
            for (let i = 0; i+1 < points.length; i++) {
                let distances = distance(points[i].cords[1], points[i].cords[0], points[i + 1].cords[1], points[i + 1].cords[0])
                setTotalDistance(totalDistance =>(totalDistance + distances))
            }
        }
    }, [props])


    return (
        <>
        <h1 style={{margin: "0"}}>Total Miles: {totalDistance}</h1>
        <button onClick={() => {props.search('eminem', 'artist')}}>Search</button>
        </>
    )
}


const mapStateToProps = (state) => ({
    Route: state.route
});

const mapDispatchToProps = dispatch => ({
    startRoute,
    addRoute,
    search
});

export default connect(mapStateToProps, mapDispatchToProps)(Route);