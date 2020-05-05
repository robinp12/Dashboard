import React, { Component, useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import hospitalsAPI from '../Services/hospitalsAPI';
import New from './New';

export default function Maps() {

    const [mark, setMark] = useState([]);
    var greyIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    useEffect(()=>{
        hospitalsAPI.findAllMap()
        .then(async data => await data)
        .then(data => { 
            setMark(data)
        })
        .catch(error => {
          console.log(error.response.data)
        });
    },[])
    return(
        <Map id="mapid" center={[50.503439, 4.855911]} zoom={8}>
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
            {mark.map((e,index) => (<div key={index}>
                {(e.longitude || e.latitude) != 0 && !isNaN(e.longitude || e.latitude) && (
                <Marker icon={greyIcon} position={[e.longitude, e.latitude]}>
                    <Popup>
                        {e.name}
                        <br/><b className="badge badge-danger badge-pill">{Math.floor(Math.random() * 200)} infectés</b>
                    </Popup>
                </Marker>)}
               
           </div> ))}
        </Map>
  )
}
