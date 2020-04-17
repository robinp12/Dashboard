import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css'
import { Marker, Popup, Map as LeafletMap, TileLayer } from "react-leaflet"

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

const Map = () => {

    const [coord, setCoord] = useState({
        x: 50.660140,
        y: 4.882752
    });
  
    return ( <>
      <LeafletMap id="mapid" center={[coord.x, coord.y]} zoom="8">
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          <Marqueur hopital="Erasme - Bruxelles" nombre={19} position={[50.813439, 4.265911]} />
          <Marqueur hopital="Saint-Pierre - Bruxelles" nombre={19} position={[50.834486, 4.345910]} />
          <Marqueur hopital="CHC - Liège" nombre={24} position={[50.648361, 5.547271]} />
          <Marqueur hopital="Saint-Luc - Bouges" nombre={32} position={[50.477253, 4.880835]} />
          <Marqueur hopital="Saint-Pierre - Ottignies" nombre={19} position={[50.667773, 4.560991]} />
          
      </LeafletMap>
      </>
      )
}

export default Map