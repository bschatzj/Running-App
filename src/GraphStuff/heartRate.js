import React, { useEffect, useState } from 'react'

export default function HeartRate(){
    const [heartRates, setHeartRates] = useState({})

    useEffect(() => {
        fetch('https://api.fitbit.com/1/user/-/activities/heart/date/2020-06-25/1d.json', {method: 'get', headers: {'Authorization': `Bearer ${localStorage.getItem('fitbit token')}`}})
        .then(res => res.json())
        .then(data => {setHeartRates(data["activities-heart-intraday"])})
        .catch(err => {console.log(err)})
    },[])

    console.log(heartRates.dataset)


    return(
        null
    )
}