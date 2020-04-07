import React from "react";
import Header from "../Header";

const ConnexionPage = () => {
    return (
        <>
            <Header title={"Connexion"}/>
            <div className="row justify-content-center">
                <form className="col-xs-12 col-sm-9 col-md-6 col-lg-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                               placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
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