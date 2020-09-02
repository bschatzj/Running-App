import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import { MapContain } from './MapStyles'
import Route from './Route/Route'
import { connect } from 'react-redux';
import {startRoute, addRoute, changeRoute} from '../Redux/Actions'
import MapIcon from './mapicon.png'

function Map(props) {
  const [zoom, setZoom] = useState()
  const [cords, setCords] = useState([])
  const [dragging, setDragging] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -104.7,
    zoom: 11,
    width: '60vw',
    height: '100%',
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })

    });

  }, [])

  useEffect(() => {


    var firstRun = props.Route.wayPoints.sort(function(a, b) {
      return (a.id - b.id);
  });

    setCords(firstRun.map((point) => (
      point.cords
    )))

  }, [props])

  const data = {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        'coordinates': cords
      }
  }


  return (
    <>
      <Route />
      <MapContain>
        <ReactMapGL
          width='100%'
          height='100%'
          {...viewport}
          mapboxApiAccessToken='pk.eyJ1IjoiYnNjaGF0emoiLCJhIjoiY2s3MHlnMGRiMDFndjNmbGN5NGN6aDllcSJ9.6U2mM86ENxVdKiXRRt6bYw'
          //mapStyle='mapbox://styles/bschatzj/ck7w41e6e00bs1jqtqe2rkal9'
          onViewportChange={viewport => {
            setZoom(viewport.zoom)
            setViewport(viewport)
          }}



          onDblClick={(e) => {
            props.addRoute({'cords': e.lngLat, 'id': Date.now()})
            console.log(e.lngLat)
          }}
        >

          {props.Route.wayPoints.map(point => (
            <Marker  longitude={point.cords[0]} latitude={point.cords[1]} draggable={true} onDragStart={() =>{console.log(point.id)}} onDragEnd={(e) => {props.changeRoute(point.id, e.lngLat)}}>
              <div style={{position:"absolute", bottom:"4px", left:"-15px", width:'25px', borderRadius:"100%", height:"25px", border:'3px solid black', backgroundColor:"orange"}}>

              </div>
            </Marker>

          ))}

          <Source id='runLine' type='geojson' data={data}>

            <Layer
              id='lineLayer'
              type='line'
              source='runLine'
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                "line-color": "#ed6498",
                "line-width": 10,
                'line-opacity': 0.8
              }}
            />
          </Source>



        </ReactMapGL>
      </MapContain>
    </>
  )
}

const mapStateToProps = (state) => ({
  Route: state.route
});

const mapDispatchToProps = {
startRoute,
addRoute,
changeRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);