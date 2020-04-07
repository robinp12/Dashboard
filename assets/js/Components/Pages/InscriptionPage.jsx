import React from "react";
import Header from "../Header";

const InscriptionPage = () => {
    return (
        <>
            <Header title={"Inscription"}/>
            <div className="row justify-content-center">
                <form onSubmit={""} className="col-xs-12 col-sm-9 col-md-6 col-lg-5">
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input className="form-control" id="name" aria-describedby="nameHelp"
                                label={"Nom"} placeholder={"Nom"} error={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input className="form-control" id="firstname" aria-describedby="firstnameHelp"
                               label={"Prénom"} placeholder={"Prénom"} error={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Email</label>
                        <input className="form-control" id="mail" type="email" aria-describedby="mailHelp"
                               label={"Email"} placeholder={"Adresse mail"} error={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="verif">Vérification</label>
                        <input className="form-control" id="verif" type="email" aria-describedby="verifHelp"
                                label={"Vérification"} placeholder={"Adresse mail"} error={""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input className="form-control" id="password" type="password" aria-describedby="passwordHelp"
                               label={"Mot de passe"} placeholder={"Mot de passe"} error={""} />
                    </div>
                    <button className="btn-secondary btn" href="#">Inscription</button>
                </form>

            </div>
        </>
    )
}

export default InscriptionPage;