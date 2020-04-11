import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css'
import { Marker, Popup, Map as LeafletMap, TileLayer } from "react-leaflet"

const Map = () => {

    const [coord, setCoord] = useState({
        x: 50.660140,
        y: 4.882752
    });
    var greyIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]

    });
    return ( <>
      <LeafletMap id="mapid" center={[coord.x, coord.y]} zoom="8">
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={greyIcon} position={[50.813405, 4.265871]}>
            <Popup>
              Erasme - Bruxelles
              <br/><b>19 infectés</b>
            </Popup>
          </Marker>
          <Marker icon={greyIcon} position={[50.834415, 4.345946]}>
            <Popup>
              Saint-Pierre - Bruxelles
              <br/><b>19 infectés</b>
            </Popup>
          </Marker>
          <Marker icon={greyIcon} position={[50.648361, 5.547271]}>
            <Popup>
              Saint-Pierre - Ottignies
              <br/><b>24 infectés</b>
            </Popup>
          </Marker>
          <Marker icon={greyIcon} position={[50.667768, 4.560916]}>
            <Popup>
              Saint-Pierre - Ottignies
              <br/><b>24 infectés</b>
            </Popup>
          </Marker>
          <Marker icon={greyIcon} position={[50.477253, 4.880835]}>
            <Popup>
              Saint-Luc - Bouges
              <br/><b>32 infectés</b>
            </Popup>
          </Marker>
        {/* use react-leaflet-control to show a simple custom control on the map
        <Control>
        <button>Trigger</button>
        </Control> */}
      </LeafletMap>
      </>
      )
}

export default Map