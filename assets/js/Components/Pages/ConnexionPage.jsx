import React, { useState } from "react";
import Header from "../Header";
import authAPI from "../Services/authAPI";
import FieldConnexion from "../Forms/FieldConnexion"
import { toast } from "react-toastify";
import usersAPI from "../Services/usersAPI";

const ConnexionPage = ({onLogin, history}) => {
        const [login, setLogin] = useState({
            username: "robipaq@hotmail.com",
            password: "password"
        });
        const [error, setError] = useState("");

        const handleChange = ({currentTarget}) => {
            const {value, name } = currentTarget;
            setLogin({...login, [name] : value});
        };

        const handleSubmit = async event => {
            event.preventDefault();
            try {
               await authAPI.authenticate(login);
                setError("");
                onLogin(true);
                toast("Connecté ! " + authAPI.getCurrent().firstName)
                history.replace("/");
            } catch (error) {
                toast("Mauvais identifiants",{
                    className: 'bg-red',
                });
                setError("Erreur dans les identifiants.")

            }
        }

    return (
        <>
            <Header title={"Connexion"}/>
            <div className="row justify-content-center">
                <form className="col-xs-12 col-sm-9 col-md-6 col-lg-4" onSubmit={handleSubmit}>
                    <FieldConnexion
                        label="Adresse email" 
                        name="username" 
                        value={login.username} 
                        onChange={handleChange} 
                        placeholder="Adresse email"
                    />
                    <FieldConnexion 
                        label="Mot de passe" 
                        name="password" 
                        value={login.password} 
                        onChange={handleChange} 
                        type="password"
                        placeholder="Mot de passe"
                        error={error} 
                    />
                    
                    <fieldset className="form-group">
                        <div className="form-check disabled">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="" disabled=""/>
                                Se souvenir de moi.
                            </label>
                        </div>
                    </fieldset>
                    <div className="form-group">
                    <button className="btn-secondary btn">Connexion</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ConnexionPage;