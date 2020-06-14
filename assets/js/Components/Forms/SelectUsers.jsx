import React, { useState, useEffect } from "react";
import usersAPI from "../Services/usersAPI";

const SelectUsers = ({ name, value, onChange, defaut, error }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersAPI.getAllUsers().then((e) => setUsers(e));
  }, []);
  return (
    <div className="mr-2">
      <select
        className={"form-control " + (error && " is-invalid")}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option hidden value>
          {defaut}
        </option>
        {users.map((user) => (
          <option value={user["@id"]} key={user.id}>
            {user.firstName + " " + user.lastName}
          </option>
        ))}
      </select>
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default SelectUsers;
