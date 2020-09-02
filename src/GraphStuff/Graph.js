import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ReferenceLine, Line
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import SongSelect from './PointLabel'
import { fromEvent } from 'rxjs'
import { map, throttleTime } from 'rxjs/operators'
import PlayList from '../song/PlayList'
const cardinal = curveCardinal.tension(0.2);

export default function Graph(props) {
  const [cleanedData, setCleanedData] = useState([])
  const [timedData, setTimedData] = useState([])
  const [clickedHR, setClickedHR] = useState()
  const [clickedTime, setClickedTime] = useState()
  const [timeClicked, setTimeClicked] = useState()
  const [HRClicked, setHRClicked] = useState()
  const [x, setX] = useState(null)
  const [y, setY] = useState(null)
  const [clickedX, setClickedX] = useState(0)
  const [clickedY, setClickedY] = useState(0)
  const [songActive, setSongActive] = useState(false)

  useEffect(() => {
    // Subscribe to the mousemove event
    const sub = fromEvent(document, 'mousemove')
      // Extract out current mouse position from the event
      .pipe(map(event => [event.clientX, event.clientY]))
      // We have closure over the updater functions for our two state variables
      // Use these updaters to bridge the gap between RxJS and React
      .subscribe(([newX, newY]) => {
        setX(newX)
        setY(newY)
      })

    // When the component unmounts, remove the event listener
    return () => {
      sub.unsubscribe()
    }
    // We use [] here so that this effect fires exactly once.
    // (After the first render)
  }, [])

  function milToStandard(value) {
    if (value !== null && value !== undefined) { //If value is passed in
      if (value.indexOf('AM') > -1 || value.indexOf('PM') > -1) { //If time is already in standard time then don't format.
        return value;
      }
      else {
        if (value.length == 8) { //If value is the expected length for military time then process to standard time.
          var hour = value.substring(0, 2); //Extract hour
          var minutes = value.substring(3, 5); //Extract minutes
          var identifier = 'AM'; //Initialize AM PM identifier

          if (hour == 12) { //If hour is 12 then should set AM PM identifier to PM
            identifier = 'PM';
          }
          if (hour == 0) { //If hour is 0 then set to 12 for standard time 12 AM
            hour = 12;
          }
          if (hour > 12) { //If hour is greater than 12 then convert to standard 12 hour format and set the AM PM identifier to PM
            hour = hour - 12;
            identifier = 'PM';
          }
          return hour + ':' + minutes + ' ' + identifier; //Return the constructed standard time
        }
        else { //If value is not the expected length than just return the value as is
          return value;
        }
      }
    }
  };

  useEffect(() => {

    setTimedData(props.data.filter(dataPoint => (parseInt(props.startTime.replace(":", "")) < parseInt(dataPoint.time.replace(":", "")) && (parseInt(dataPoint.time.replace(":", "")) < (parseInt(props.endTime.replace(":", "")))))))

  }, [props])


  useEffect(() => {
    setCleanedData(timedData.map(dataPoint => (

      { time: milToStandard(dataPoint.time), 'My-BPM': dataPoint.value, resting: 95, anarobic: 120, arobic: 165, peak: 190 }

    )))
  }, [timedData])



  function CustomTooltip({ payload, label, active }) {
    if (active && payload !== null) {
      setClickedHR(payload[0].payload["My-BPM"])
      setClickedTime(payload[0].payload.time)
      return (
        <div className="custom-tooltip" onClick={() => {console.log('hi')}}>
          <p className="label">{`Heartrate : ${payload[0].payload["My-BPM"]} BPM`}</p>
          <p className="desc">{`Time : ${payload[0].payload.time}`}</p>
        </div>
      );
    }
  
    return null;
  }




  function CustomButton({ payload, label, active }) {
    if (active && payload !== null) {
      return (
        <circle r={10}
        fill={'red'}
        onClick={() => {console.log('hi!!!')}}
        />
      );
    }
  
    return null;
  }


  const clickEvent = e => {
    setHRClicked(clickedHR)
    setTimeClicked(clickedTime)
    setClickedX(x)
    setClickedY(y)
    setSongActive(true)
  }




  return (
    <>
      <div style={{ width: '100%', height: '80vh' }}>
        
        {songActive ? <SongSelect time={timeClicked} bpm ={HRClicked} x={clickedX} y={clickedY} setActive={setSongActive}/> : null}
        <ResponsiveContainer>
          <AreaChart
          
          onClick={() => {clickEvent()}}
            data={cleanedData}
            margin={{
              top: 10, right: 50, left: 50, bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time">
              <Label offset={-50} value="Time" style={{ fontSize: "3rem", position: 'relative', top: '13rem' }} position="insideBottom" />
            </XAxis>
            <YAxis>
              <Label value="BPM (Beats Per Minute)" angle={270} position='left' style={{ textAnchor: 'middle', fontSize: "3rem" }} />
            </YAxis>
            <Tooltip content={<CustomTooltip />}/>
            
            
            <Line activeDot={true} label={ <CustomButton/> } dataKey="My-BPM" stroke="#82ca9d" fill="#82ca9d" fillOpacity={1} />

            <Area activeDot={true} dataKey="My-BPM" stroke="#82ca9d" fill="#82ca9d" fillOpacity={1} />
            
            <Area type={cardinal} dataKey="resting" fill={"blue"} opacity =".2"   activeDot={0}/>
            <Area dataKey="peak" fill="red" opacity=".2"  activeDot={0}/>
            <Area type={cardinal} dataKey="arobic" fill={"orange"} opacity =".2"  activeDot={0}/>
            <Area type={cardinal} dataKey="anarobic" fill={"purple"} opacity =".2" activeDot={0}/>

          </AreaChart>
        </ResponsiveContainer>
        <PlayList />
      </div>
    </>
  );
}


