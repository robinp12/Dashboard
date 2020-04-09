import React from 'react';

const Navbar = props => {
    return ( 
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href={"/"}>Tableau de bord covid</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href={"/"} >Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={"#/units"} >Unité de soin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={"/"} >Maps</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={"#/users"} >Utilisateurs</a>
                </li>
              </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ml-2 mr-2">
                        <a className="btn btn-outline-secondary text-light" href={"#/inscription"}>Inscription</a>
                    </li>
                    <li className="nav-item ml-2 mr-2">
                        <a className="btn btn-outline-secondary text-light active" href={"#/connexion"} >Connexion</a>
                    </li>

                    <li className="nav-item ml-2 mr-2">
                        <a className="btn btn-outline-secondary text-light active" href={"/"}>Déconnexion</a>
                    </li>
                </ul>
            </div>
        </nav>
    </> 
);
}
 
export default Navbar;