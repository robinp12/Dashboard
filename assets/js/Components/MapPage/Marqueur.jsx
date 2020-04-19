import React, { useState, useEffect, Component } from 'react';
import 'leaflet/dist/leaflet.css'
import { Marker, Popup, Map as LeafletMap, TileLayer } from "react-leaflet"
import Axios from 'axios';

const Marqueur = ({hopital, nombre, position}) => {

    var greyIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    return (<> 
            <Marker icon={greyIcon} position={position} >
              <Popup>
                {hopital}
                <br/><b>{nombre} infectés</b>
              </Popup>
            </Marker>
            </>)
  }

  export default Marqueur;