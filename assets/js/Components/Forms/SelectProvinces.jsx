import React, { useState } from 'react';

const SelectProvince = ({name, value, onChange, defaut,error}) => {
   
        const [provinces, setProvinces] = useState([
            "Bruxelles","Liège","Namur"
        ]);
        return ( 
            <div className="col">
                <select 
                className={"form-control " + (error && " is-invalid")}
                id={name} 
                name={name} 
                onChange={onChange} 
                value={value}
                >
                    <option hidden value>{defaut}</option>
                    {provinces.map((role,index) => <option value={role} key={index}>{role}</option>)}
                </select>
                { error && <p className="invalid-feedback">{error}</p>}
            </div>
         )};
 
export default SelectProvince;