import React from 'react';
import Context from '../Services/Context';

const Select = ({name, value, onChange, className="form-control"}) => {
    return ( 
        <>
            <select 
            className={className} 
            id={name} 
            name={name} 
            onChange={onChange} 
            value={value}>
                {Context.roles().map((role,index) => <option value={role.value} key={index}>{role.nom}</option>)}
            </select>
        </>
     )};
 
export default Select;