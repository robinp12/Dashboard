import React, {useEffect} from "react";
import axios from 'axios';

const Test = props => {

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://slbo.careboard.pro/apiv2/push',
            headers:{
                Authorization: "Bearer 8IQ0UJoYT6slr4A7dFRisVQHBq64EwPwBw3y0ppEkqxoMgV5CS92p9UjKk38uDTK0BmwJ8a4N589BxtJu9Ypp6YQqD9LsIRXnOoculSOJgKzECH4WHPGlKz1cUHYAYdl",

    },
            params : {
                "token": "8IQ0UJoYT6slr4A7dFRisVQHBq64EwPwBw3y0ppEkqxoMgV5CS92p9UjKk38uDTK0BmwJ8a4N589BxtJu9Ypp6YQqD9LsIRXnOoculSOJgKzECH4WHPGlKz1cUHYAYdl",
                "service": 15,
                "reference": 1792,
                "value": 7,
                "timestamp": "2020-03-31T09:15:00.816Z"
            },
            data: {

            }
        }, console.log(''));
    });


    return(
        <>
        </>
    )
}
export default Test;