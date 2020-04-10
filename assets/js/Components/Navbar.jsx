import React from 'react';
import authAPI from './Services/authAPI';
import { NavLink } from 'react-router-dom';


const Navbar = ({isAuth, onLogout, history}) => {

    const handleLogout = () => {
      authAPI.logout();
      onLogout(false);
      history.push("/connexion");
    }

    return ( 
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Tableau de bord covid</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/" >Home <span className="sr-only">(current)</span></NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/" >Maps</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/units" >Unité de soin</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users" >Utilisateurs</NavLink>
                </li>
              </ul>
                <ul className="navbar-nav ml-auto">
                  {!isAuth && 
                  <>
                    <li className="nav-item ml-2 mr-2">
                      <NavLink className="btn btn-outline-secondary text-light" to="/inscription">Inscription</NavLink>
                    </li>
                    <li className="nav-item ml-2 mr-2">
                      <NavLink className="btn btn-outline-secondary text-light active" to="/connexion" >Connexion</NavLink>
                    </li>
                  </> ||
                    <li className="nav-item ml-2 mr-2">
                      <button className="btn btn-outline-secondary text-light active" 
                      onClick={handleLogout}>Déconnexion</button>
                    </li>
                  }
                </ul>
            </div>
        </nav>
    </> 
);
}
 
export default Navbar;