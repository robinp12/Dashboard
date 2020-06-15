import React from "react";
//Composant d'input
const FieldInscription = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error = "",
  size = "col-2"
}) => (
  <div className={size}>
    <input
      className={"form-control" + (error && " is-invalid")}
      value={value}
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      onChange={onChange}
    />
    {error && <p className="invalid-feedback">{error}</p>}
  </div>
);

export default FieldInscription;
