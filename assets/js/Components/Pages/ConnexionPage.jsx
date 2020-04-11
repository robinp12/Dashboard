import React, { useState } from "react";
import Header from "../Header";
import authAPI from "../Services/authAPI";

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
                history.replace("/");
            } catch (error) {
                setError("Mauvais identifiants");
            }
        }

    return (
        <>
            <Header title={"Connexion"}/>
            <div className="row justify-content-center">
                <form className="col-xs-12 col-sm-9 col-md-6 col-lg-4" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Adresse email</label>
                        <input 
                            value={login.mail}
                            name="username"
                            onChange={handleChange}
                            type="email" 
                            className={"form-control" + (error && " is-invalid")}
                            id="username" 
                            aria-describedby="emailHelp"
                            placeholder="Adresse email" 
                        />
                        { error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            value={login.password}
                            name="password"
                            onChange={handleChange}
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Mot de passe"
                        />
                    </div>
                    <fieldset className="form-group">
                        <div className="form-check disabled">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="" disabled=""/>
                                Se souvenir de moi.
                            </label>
                        </div>
                    </fieldset>
                    <button className="btn-secondary btn">Connexion</button>
                </form>
            </div>
        </>
    )
}

export default ConnexionPage;