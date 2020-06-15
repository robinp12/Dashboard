import QrCode from "qrcode.react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FieldConnexion from "../Forms/FieldConnexion";
import Header from "../Header";
import authAPI from "../Services/authAPI";

const ConnexionPage = ({ onLogin, history }) => {
  //State permettant d'afficher ou non l'inscription
  const [showRegister, setShowRegister] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  //Mise ne place dans le state
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authAPI.authenticate(login);
      setError("");
      onLogin(true);
      toast("Connecté ! " + authAPI.getCurrent().firstName);
      history.replace("/");
    } catch (error) {
      toast("Mauvais identifiants", {
        className: "bg-red",
      });
      setError("Mauvais identifiants");
    }
  };

  return (
    <>
      {(!showRegister && (
        <>
          <Header title={"Connexion"} />
          <div className="row justify-content-center">
            <form
              className="col-xs-12 col-sm-9 col-md-6 col-lg-4"
              onSubmit={handleSubmit}
            >
              <FieldConnexion
                label="Adresse mail"
                name="username"
                value={login.username}
                onChange={handleChange}
                placeholder="Adresse mail"
                error={error}
              />
              <FieldConnexion
                label="Mot de passe"
                name="password"
                value={login.password}
                onChange={handleChange}
                type="password"
                placeholder="Mot de passe"
              />
              <div className="form-group">
                <button className="btn-secondary btn">Connexion</button>
                <div
                  className="btn btn-outline-danger float-right"
                  onClick={() => setShowRegister(true)}
                >
                  Demande d'inscription
                </div>
              </div>
            </form>
          </div>
        </>
      )) || (
        <>
          <Header title={"Demande d'inscription"} />
          <div className="row justify-content-center">
            <form
              className="col-xs-12 col-sm-9 col-md-6 col-lg-4 text-center"
              onSubmit={handleSubmit}
            >
              <h5 className="col-12 ">
                Pour une demande d'inscription, veuillez prendre contact avec un
                administrateur en scannant ce QRcode :
              </h5>
              <QrCode className="text-center" value="robipaq@hotmail.com" />
              <br />
              <small>
                Où en prennant contact avec cette adresse mail :
                robipaq@hotmail.com
              </small>
              <div
                className="mt-2 btn btn-secondary col-12"
                onClick={() => setShowRegister(false)}
              >
                Retour à la page de connexion
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ConnexionPage;
