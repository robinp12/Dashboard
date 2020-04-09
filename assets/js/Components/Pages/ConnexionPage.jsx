import React, { useState } from "react";
import Header from "../Header";
import Axios from "axios";
import Test from "../Test";

const ConnexionPage = () => {
        const [login, setLogin] = useState({
            username: "",
            password: ""
        });

        const [error, setError] = useState("");

        const handleChange = event => {
            const value = event.currentTarget.value;
            const name = event.currentTarget.name;

            setLogin({...login, [name] : value});
        };
        const handleSubmit = async event => {
            event.preventDefault();

            try {
                const token = await Axios
                .post("", login)
                .then(response => response.data.token)

                setError("");

                window.localStorage.setItem("authToken", token);   
                   
                Axios.defaults.headers["Authorization"] = "Bearer " + token;

            } catch (error) {
                setError("Aucun compte avec cet email");
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
                    <button className="btn-secondary btn" href="#">Connexion</button>
                </form>
            </div>
        </>
    )
}

export default ConnexionPage;