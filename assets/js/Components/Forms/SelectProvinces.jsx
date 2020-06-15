import React, { useEffect, useState } from "react";
import provincesAPI from "../Services/provincesAPI";
// Selecteur de province
const SelectProvince = ({ name, value, onChange, defaut, error, refe }) => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    provincesAPI.findAll().then((e) => {
      setProvinces(e);
    });
  }, []);
  return (
    <div className="col-4">
      <select
        className={"form-control " + (error && " is-invalid")}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        ref={refe}
      >
        <option hidden value="">
          {defaut}
        </option>
        {provinces.map((prov, index) => (
          <option value={prov["@id"]} key={index}>
            {prov.name}
          </option>
        ))}
      </select>
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default SelectProvince;
