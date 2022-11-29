import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import Feed from "../components/layout/Feed";
import api from "../services/carServiceFetch";



function HomePage() {

    const[rides, setRides] = useState(null)


    useEffect(() => {

        const fetchRides = async () => {
            try{
                const response = await api.get('/rides')
                console.log(response.data)
                setRides(response.data)
            } catch (err) {
                if(err.response) {
                    console.log(err.response.status)
                    console.log(err.response.headers)
                }
            }
        }
        console.log(rides)

        fetchRides()

    }, [])

    return (
        <Box>
            {rides && <Feed props={rides}/>}
        </Box>
    )
}

export default HomePage;

