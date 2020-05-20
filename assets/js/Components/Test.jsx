import React, { useState, useEffect, useRef } from "react";
import PageLoader from "./PageLoader";
import nominatim from "nominatim-geocoder";

const Test = () => {
  const [address, setAddress] = useState("");
  const [listHop, setListHop] = useState([]);
  const refInput = useRef();
  const refSelect = useRef();
  const nom = new nominatim();
  nom
    .search({ q: address })
    .then((response) => {
      setListHop(response);
    })
    .catch((error) => {
      console.log(error);
    });
  const handleChange = () => {
    setAddress(refInput.current.value);
  };
  const handleSelect = () => {
    console.log(refSelect.current.value);
  };
  return (
    <>
      {(!true && (
        <div className="text-center">
          <PageLoader />
        </div>
      )) || (
        <>
          <h4>Données chargées!</h4>
          <h4>GERER TABLE PROVINCE</h4>
          <h4>ENVOYER MAIL LORS D'INSCRIPTION</h4>
          <h4>AJOUTER COLONNE ADRESSE & nombre d'infecté</h4>
          <h4>AJOUTER MANUELLEMENT PROVINCE</h4>
          <h4></h4>
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
              <button onClick={handleSelect}>X</button>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Test;
