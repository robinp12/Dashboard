import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FieldConnexion from "../../Forms/FieldConnexion";
import Header from "../../Header";
import authAPI from "../../Services/authAPI";
import usersAPI from "../../Services/usersAPI";

const Profil = ({ onLogin, history }) => {
  const [data, setData] = useState({});
  const [up, setUp] = useState(true);
  const [error, setErrors] = useState("");
  const [user, setUser] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: undefined,
  });
  const handleChange = async ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    setUp(!up);
    e.preventDefault();
    let id = authAPI.getCurrent().id;

    try {
      await usersAPI.updateInfo(id, user);
      if (!(data.email == user.email || typeof user.email == "undefined")) {
        toast(
          "Vous allez être déconnecté pour que la nouvelle adresse mail soit prise en compte."
        );
        setTimeout(() => {
          authAPI.logout();
          setTimeout(() => {
            window.location.replace("/");
          }, 2000);
        }, 1000);
      } else {
        toast("Modification effectuée");
      }
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

  useEffect(() => {
    let id = authAPI.getCurrent().id;
    usersAPI.findUser(id).then((e) => {
      setData(e);
    });
  }, [up]);

  return (
    <>
      {typeof data?.roles != "undefined" && (
        <>
          <Header title={"Gestion du profil"} />
          <div className="row justify-content-center">
            <div className="profil col-xs-12 col-sm-12 col-md-9 col-lg-7">
              <h5>{"Profil : " + data?.firstName + " " + data?.lastName}</h5>
              <hr/>
              <div className="row justify-content-center">
                <div className="col">
                  <div className="row justify-content-center">
                    <FieldConnexion
                      label="Prénom :"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder={data?.firstName}
                      error={error.firstName}
                    />
                  </div>
                  <div className="row justify-content-center">
                    <FieldConnexion
                      label="Nom :"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder={data?.lastName}
                      error={error.lastName}
                    />
                  </div>
                  <div className="row justify-content-center">
                    <FieldConnexion
                      label="Adresse mail :"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      type="mail"
                      placeholder={data?.email}
                      error={error.email}
                    />
                  </div>
                  <div className="row justify-content-center">
                    <FieldConnexion
                      label="Mot de passe :"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      type="password"
                      placeholder="Nouveau mot de passe"
                    />
                  </div>
                  <div className="row justify-content-center">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="btn btn-outline-secondary col-5 mb-3 mt-2"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="form-group p-2">
                      <label>Rôle : </label>
                      <div className="form ml-3">{data?.roles[0]}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group p-2">
                      <label>Nombre d'hôpitaux : </label>
                      <div className="form mt-1">
                        <ol className="listeProfil pt-2 pb-2">
                          {data?.hospitals.map((e, o) => (
                            <li key={o} className="pl-2 ml-0">
                              {e.name}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profil;
