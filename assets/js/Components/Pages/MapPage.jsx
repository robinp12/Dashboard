import React from 'react';
import 'leaflet/dist/leaflet.css'
import Header from '../Header';
import Map from '../Map';
import MapList from '../MapList';

const MapPage = () => {

    return ( <>
        <Header title="Cas Belgique"/>
        <div className="row justify-content-center">
            <div className="col-md-3">
                <MapList/>
            </div>
            <hr className="mid align-middle" />
            <div className="col-md-8">
                <Map/>
                <br/>
            </div>
        </div>
      </>
      )
}

export default MapPage