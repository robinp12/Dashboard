import React from 'react';

const FieldInscription = ({name, value, onChange, placeholder, type="text", error=""}) => ( 
    
    <div className="col">
        <input 
            className={"form-control" + (error && " is-invalid")}
            value={value} 
            type={type} 
            name={name}
            id={name} 
            placeholder={placeholder} 
            onChange={onChange}
        />
        { error && <p className="invalid-feedback">{error}</p>}
    </div>
);
 
export default FieldInscription;