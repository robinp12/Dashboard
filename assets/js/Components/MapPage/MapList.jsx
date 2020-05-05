import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import hospitalsAPI from '../Services/hospitalsAPI';
import New from './New';

const tab = [];
const MapList = () => {
    const [show, setshow] = useState()
    const [hopitals, setHopitals] = useState([]);
    const [province, setprovince] = useState([]);
    
    const handleClick = (e) => {
        const {id, checked} = e.target;
        if(checked == false){
            tab.push(id)
        }
        if(checked == true){
            tab.pop(id)
        }
        setshow(!show);
    }

    hospitalsAPI.findAllMap()
        .then(data => {
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
            prov.push(o.province)
        }
        setprovince([...new Set(prov)])
    },[hopitals]);

    const list = (hopitals) => {
        return (
            <ul className='liste list-group text-secondary list-group-flush'>
                {hopitals.map((hopital,index) => 
                    (!tab.includes(hopital.province)) && (<li key={index} className="list-group-item d-flex justify-content-between align-items-center li">
                        {hopital.name} -- {hopital.province}
                        <span className="badge badge-danger badge-pill">{Math.floor(Math.random() * 200)}</span>
                    </li>)
                )}
            </ul>
        )
    }
        return(
            <>
            <div>
                {province.map((ville,index) => 
                <div key={index} className="form-check form-check-inline">
                    <input type="checkbox" onClick={(e) => handleClick(e)} className="form-check-input" id={ville} defaultChecked/>
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