import React from 'react';

const FieldConnexion = ({name, label, value, onChange, placeholder, type="text", error=""}) => ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input 
                value={value}
                name={name}
                onChange={onChange}
                type={type} 
                className={"form-control" + (error && " is-invalid")}
                id={name} 
                placeholder={placeholder} 
            />
            { error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
 
export default FieldConnexion;