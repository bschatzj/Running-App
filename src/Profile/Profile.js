import React, { useEffect, useState } from 'react'
import './Profile.css'
import { axiosWithAuth } from "../Utils/AxiosWithAuthBack.js";

export default function Profile() {

    const [profile, setProfile] = useState('')
    useEffect(() => {

        axiosWithAuth()
            .get('/profile')
            .then(res => {
                console.log(res)
                setProfile(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <div className="ProfilePage">
            <div>

            </div>
        </div>
    )
}