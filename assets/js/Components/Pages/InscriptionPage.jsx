import React, { useState } from "react";
import Header from "../Header";
import usersAPI from "../Services/usersAPI";

const InscriptionPage = ({history}) => {

    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    });
    const [error, setError] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        passwordConfirm:""
    });
    // Changement des inputs
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        
        setUser({...user, [name] : value});
    };
    // Soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Confirmation pas correcte"
            setError(apiErrors);
            return
        }


        try {
            await usersAPI.register(user)
            setError({})
            history.replace("#/connexion")
        } catch (error) {
            const {violations} = error.response.data;

            if(violations){
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setError(apiErrors);
            }
        }
    }

    return (
        <>
            <Header title={"Inscription"}/>
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit} className="col-xs-12 col-sm-9 col-md-6 col-lg-5">
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input name="lastName" className="form-control" label={"Nom"} placeholder={"Nom"} error={error.lastName} value={user.lastName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input 
                            name="firstName"
                            className="form-control"
                            label={"Prénom"} 
                            placeholder={"Prénom"} 
                            error={error.firstName} 
                            value={user.firstName} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Email</label>
                        <input 
                            name="email"
                            className="form-control" type="email"
                            label={"Email"} 
                            placeholder={"Adresse mail"} 
                            error={error.email} 
                            value={user.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            name="password"
                            className="form-control" type="password"
                            label={"Mot de passe"} 
                            placeholder={"Mot de passe"} 
                            error={error.password} 
                            value={user.password} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirmation mot de passe</label>
                        <input 
                            name="passwordConfirm"
                            className="form-control" type="password"
                            label={"Mot de passe"} 
                            placeholder={"Mot de passe"} 
                            error={error.passwordConfirm} 
                            value={user.passwordConfirm} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn-secondary btn" type="submit">
                            Inscription
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default InscriptionPage;