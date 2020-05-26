import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import hospitalsAPI from '../Services/hospitalsAPI';

const MapList = ({onChange, show}) => {
    const [hopitals, setHopitals] = useState([]);
    const [province, setprovince] = useState([]);

    hospitalsAPI.findAllMap()
        .then(data => {
            console.log(data)
            setHopitals(data);
        })
        .catch(error => {
            console.log(error.response.data)
            toast(error + "",{
            className: 'bg-red',
        });
    });

    useEffect(()=>{
        const prov = [];
        for(let o of hopitals){
            prov.push(o.province.name)
        }
        setprovince([...new Set(prov)])
    },[hopitals]);
    console.log((hopitals))

    const list = (hopitals) => {
        return (
            <ul className='liste list-group text-secondary list-group-flush'>
                {hopitals.map((hopital,index) => 
                     (!show.includes(hopital.province.name)) && 
                    (<li key={index} className="list-group-item d-flex justify-content-between align-items-center li">
                        {hopital.name} -- 
                        {hopital.province.name}
                        <span className="badge badge-danger badge-pill">{hopital.caseNumber??0}</span>
                    </li>
                    )
                )}
            </ul>
        )
    }
        return(
            <>
            <div>
                {province.map((ville,index) => 
                    <div key={index} className="form-check form-check-inline">
                    <input type="checkbox" onClick={onChange} className="form-check-input" id={ville} defaultChecked={!show.includes(ville)}/>
                    <label className="form-check-label" htmlFor={"Check"+ index} value={ville}>
                        {ville}
                    </label>
                </div>)}
            </div>
            <br/>
               {list(hopitals)}
        </>
    )
}
 
export default MapList;