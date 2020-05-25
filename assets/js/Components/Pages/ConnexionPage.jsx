import React, { useState } from "react";
import Header from "../Header";
import authAPI from "../Services/authAPI";
import FieldConnexion from "../Forms/FieldConnexion"
import { toast } from "react-toastify";
import RequestTokenAPI from "../Services/RequestTokenAPI";

const ConnexionPage = ({onLogin, history}) => {
        const [login, setLogin] = useState({
            username: "",
            password: ""
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
                setError("Mauvais identifiants")

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
                    </div>
                </form>
            </div>
        </>
    )
}

export default ConnexionPage;