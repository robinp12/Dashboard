import React, { useState } from "react";
import { toast } from "react-toastify";
import FieldInscription from "../../Forms/FieldInscription";
import Select from "../../Forms/Select";
import usersAPI from "../../Services/usersAPI";

const AddUser = (props) => {
  const [users, setUsers] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    roles: [],
  });
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUsers({ ...users, [name]: value });   
  };
  const handleChangeSelect = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUsers({ ...users, [name]: [value] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep = await usersAPI.register(users);
      toast(users.firstName + " a été ajouté");
      setErrors("");
    } catch (error) {
      toast("Erreur dans le formulaire !" + "", {
        className: "bg-red",
      });
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
    }
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
          <form onSubmit={handleSubmit}>
            <h5>Ajouter un utilisateur</h5>
            <div className="form-group mt-3 mb-2">
              <div className="form-row">
                <FieldInscription
                  name="lastName"
                  value={users.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  error={errors.lastName}
                />
                <FieldInscription
                  name="firstName"
                  value={users.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  error={errors.firstName}
                />
                <FieldInscription
                  name="email"
                  value={users.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                  size="col-3"
                />
                <FieldInscription
                  name="password"
                  value={users.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Mot de Passe"
                  error={errors.password}
                />
                <Select
                  name="roles"
                  className="custom-select"
                  onChange={handleChangeSelect}
                  value={users.roles[0]}
                  defaut={"Accès"}
                />
                <div className="col-1">
                  <button className="btn-secondary btn ml-2" type="submit" disabled={!(users.firstName && users.lastName && users.email && users.password)}>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
