import React, { useState, useEffect, useRef } from "react";
import PageLoader from "./PageLoader";
import nominatim from "nominatim-geocoder";
import Axios from "axios";
import hospitalsAPI from "./Services/hospitalsAPI";

const Test = () => {
  const [address, setAddress] = useState("");
  const [listHop, setListHop] = useState([]);
  const refInput = useRef();
  const refSelect = useRef();
  
  const handleChange = () => {
    setAddress(refInput.current.value);
  };
  const handleSelect = () => {
   
    hospitalsAPI.addCase({
      caseNumber: 199,
      hospital:"/api/hospitals/5"
    })
  };
  const [hospitals, setHospitals] = useState({
    case_number: 56
  });
  

  return (
    <>
      {(!true && (
        <div className="text-center">
          <PageLoader />
        </div>
      )) || (
        <>
          <h4>ENVOYER MAIL LORS D'INSCRIPTION</h4>
          <input ref={refInput} type="text"></input>
          <button onClick={handleChange}>X</button>
          <br />
          {listHop.length > 0 && (
            <>
              <select className="select-address" ref={refSelect}>
                {listHop.map((e) => (
                  <>
                    <option key={e.osm_id} value={e.osm_id}>
                      {e.display_name}
                    </option>
                  </>
                ))}
              </select>
            </>
          )}
        </>
      )}
      <button onClick={handleSelect}>X</button>
    </>
  );
};
export default Test;
