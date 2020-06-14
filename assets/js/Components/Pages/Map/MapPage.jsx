import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import Header from "../../Header";
import Map from "./Map";
import MapList from "./MapList";

const tab = [];
const MapPage = () => {
  const [show, setshow] = useState(true);
  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (checked == false) {
      tab.push(id);
    }
    if (checked == true) {
      let newId = tab.indexOf(id)
      tab.splice(newId, 1);
    }
    setshow(!show);
  };
  return (
    <>
      <Header title="Hôpitaux en Belgique" />
      <div className="row justify-content-center">
        <div className="col-md-3">
          <MapList show={tab} onChange={(e) => handleChange(e)} />
        </div>
        <hr className="mid align-middle" />
        <div className="col-md-8">
          <Map show={tab} />
          <br />
        </div>
      </div>
    </>
  );
};

export default MapPage;
