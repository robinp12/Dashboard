import React from "react";
import authAPI from "./Services/authAPI";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ isAuth, onLogout, history }) => {
  const handleLogout = () => {
    authAPI.logout();
    onLogout(false);
    toast("Vous êtes déconnecté !");
    history.push("/connexion");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Tableau de bord
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
            <NavLink className="nav-link" to="/" >Home <span className="sr-only">(current)</span></NavLink>
            </li> */}
            {isAuth && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/map">
                    Map
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/hospitals">
                    Hôpitaux
                  </NavLink>
                </li>
                {authAPI.isAdmin() && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/users">
                      Utilisateurs
                    </NavLink>
                  </li>
                )}
              </>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/test">
                Tests
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {(!isAuth && (
              <>
                <li className="nav-item ml-2 mr-2">
                  <NavLink
                    className="btn btn-outline-secondary text-light active"
                    to="/connexion"
                  >
                    Connexion
                  </NavLink>
                </li>
              </>
            )) || (
              <>
                <li className="nav-link text-light">{authAPI.isAdmin()?authAPI.getCurrent().roles:""}</li>
                <li className="nav-item ml-2 mr-2">
                  <button
                    className="btn btn-outline-secondary text-light active"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
