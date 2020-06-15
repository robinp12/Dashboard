import React, { useState } from 'react';
//Selecteur de role
const Select = ({name, value, onChange, className="form-control", defaut}) => {
   
    const [roles, setRoles] = useState(["USER","ADMIN"])
    return ( 
         <div className="col">
            <select 
            className={className} 
            id={name} 
            name={name} 
            onChange={onChange} 
            value={value}
            >
                <option hidden value>{defaut}</option>
                {roles.map((role,index) => <option value={role} key={index}>{role}</option>)}
            </select>
            </div>
     )}; 
export default Select;