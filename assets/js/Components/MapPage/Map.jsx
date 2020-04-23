import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css'
import { Map as LeafletMap, TileLayer } from "react-leaflet"
import Marqueur from './Marqueur';
import hospitalsAPI from '../Services/hospitalsAPI';

class Map extends Component {

  state = {
    name : [],
  }
  componentDidMount(){
    hospitalsAPI.findAll()
    .then(data => { 
        this.setState({ name : data });
    })
    .catch(error => {
      console.log(error.response.data)
    });
  }
  render() { 
    const {name, longitude, latitude} = this.state;

    return(
      <>
      <LeafletMap id="mapid" center={[50.813439, 4.265911]} zoom="8">
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
      {name.map((data,index) => {
        <Marqueur key={index} hopital={data.name} nombre={19} position={[data.latitude, data.longitude]} />
      })}
          <Marqueur hopital="Saint-Pierre - Bruxelles" nombre={19} position={[50.834486, 4.345910]} />
          <Marqueur hopital="CHC - Liège" nombre={24} position={[50.648361, 5.547271]} />
          <Marqueur hopital="Saint-Luc - Bouges" nombre={32} position={[50.477253, 4.880835]} />
        <Marqueur hopital="Saint-Pierre - Ottignies" nombre={19} position={[50.667773, 4.560991]} />
          
      </LeafletMap>
      </>
    )
  }
}

export default Map;