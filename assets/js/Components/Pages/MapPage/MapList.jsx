import React, { useState } from 'react';
import { Handler } from 'leaflet';

    
const Villes = () => {
    const [ville, setVille] = useState([
        "Namur","Liege","Bruxelles",   
    ]);

    return(
        <>
        {ville.map((ville,index) => 
                <div key={index} className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" id={"Check"+ index}/>
                    <label className="form-check-label" htmlFor={"Check"+ index} value="Bxl">
                    {ville}
                    </label>
                </div>
            )}
        </>
    )
}
const Hopitaux = () => {

    const [hopitaux, setHopitaux] = useState([
        "Saint-Pierre - Bruxelles",
        "Erasme - Bruxelles",
        "CHC - Liège",
        "Saint-Pierre - Ottignies", 
        "Saint-Luc - Bouges"  
    ]);
    return(
        <>
        {hopitaux.map((hopital,index) => 
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {hopital}
                <span className="badge badge-danger badge-pill">{Math.floor(Math.random() * 200)}</span>
            </li>
        )}
        </>
    )
}

const MapList = (props) => {
    
    return ( 
    <>
        <div>
            {Villes()}
        </div>
        <br/>
        <ul className='list-group text-muted list-group-flush'>
            {Hopitaux()}  
        </ul>
    </> 
    );
}
 
export default MapList;