import React from 'react';
const MapList = (props) => {
    return ( 
    <>
        <ul className='list-group text-muted list-group-flush'>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Saint-Luc - Bouge
                <span className="badge badge-danger badge-pill">32</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Saint-Pierre - Bruxelles
                <span className="badge badge-danger badge-pill">47</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Erasme - Bruxelles
                <span className="badge badge-danger badge-pill">19</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                CHC - Liège
                <span className="badge badge-danger badge-pill">28</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Saint-Pierre - Ottignies
                <span className="badge badge-danger badge-pill">24</span>
            </li>         
        </ul>
    </> 
    );
}
 
export default MapList;