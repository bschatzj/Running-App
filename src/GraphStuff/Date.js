import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import Graph from './Graph'
import { TextField } from '@material-ui/core'




export default function MyApp() {
    const [value, onChange] = useState(new Date());
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [heartRates, setHeartRates] = useState([{time: "100", value: 112 }, {time: "10", value: 100 }])
    const [startTime, setStartTime] = useState("00:00")
    const [endTime, setEndTime] = useState("23:59")
    useEffect(() => {
        console.log(value.toLocaleDateString())
        setYear(value.toLocaleDateString().slice(value.toLocaleDateString().length - 4, value.toLocaleDateString().length))
        setMonth((0 + value.toLocaleDateString().slice(0, 2)).replace('010', '10').replace('011', '11').replace('012', '12').replace('/', ""))
        setDay((0 + value.toLocaleDateString().slice(2, 4)).replace('010', '10').replace('011', '11').replace('012', '12').replace('013', '13').replace('014', '14').replace('015', '15').replace('016', '16').replace('017', '17').replace('018', '18').replace('019', '19').replace('020', '20').replace('021', '21').replace('022', '22').replace('023', '23').replace('024', '24').replace('025', '25').replace('026', '26').replace('027', '27').replace('028', '28').replace('029', '29').replace('030', '30').replace('031', '31').replace('/', ""))
    }, [value])

    useEffect(() => {

        fetch('https://api.fitbit.com/1/user/-/activities/heart/date/' + year + '-' + month + '-' + day + '/1d.json', { method: 'get', headers: { 'Authorization': `Bearer ${localStorage.getItem('fitbit token')}` } })
            .then(res => res.json())
            .then(data => { setHeartRates(data["activities-heart-intraday"].dataset) })
            .catch(err => { console.log(err) })
    }, [day, month, year])


    const handleChange = e => {
        setStartTime(e.target.value)
    }

    const handleEndChange = e => {
        setEndTime(e.target.value)
    }

    console.log(heartRates)
    console.log('year', year)
    console.log('month', month)
    console.log('day', day)
    console.log(startTime)
    console.log(endTime)







    return (
        <div>
            <TextField
                id="time"
                label="Start Time"
                type="time"
                defaultValue="07:30"
                value={startTime}
                onChange={handleChange}
                inputProps={{
                    step: 60, // 1 min
                }}
            />

<TextField
                id="time"
                label="End Time"
                type="time"
                defaultValue="07:30"
                value={endTime}
                onChange={handleEndChange}
                inputProps={{
                    step: 60, // 1 min
                }}
            />
            <DatePicker
                onChange={onChange}
                value={value}
                format="MM-dd-yyyy"

            />
            <Graph data={heartRates} startTime={startTime} endTime={endTime}/>
        </div>
    );
}