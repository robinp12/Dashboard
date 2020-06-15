import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/App.css";
import Navbar from "../js/Components/Navbar";
import ConnexionPage from "../js/Components/Pages/ConnexionPage";
import Footer from "./Components/Footer";
import HomePage from "./Components/Pages/Home/HomePage";
import HospitalsPage from "./Components/Pages/Hospital/HospitalsPage";
import MapPage from "./Components/Pages/Map/MapPage";
import Profil from "./Components/Pages/Profil/Profil";
import UsersPage from "./Components/Pages/User/UsersPage";
import authAPI from "./Components/Services/authAPI";
import requestTokenAPI from "./Components/Services/RequestTokenAPI";

authAPI.setup();
// Nouveau token pour l'api careboard
requestTokenAPI();

{
  /* Routes sécurisées */
}
const PrivateRoute = ({ path, isAuth, component }) =>
  isAuth ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/connexion" />
  );
const App = () => {
  const [isAuth, setIsAuth] = useState(authAPI.isAuth());
  const NavbarWithRouter = withRouter(Navbar);

  return (
    <>
      <HashRouter>
        <NavbarWithRouter isAuth={isAuth} onLogout={setIsAuth} />
        <main className="jumbotron">
          <Switch>
            <PrivateRoute path="/profil" isAuth={isAuth} component={Profil} />
            <PrivateRoute path="/map" isAuth={isAuth} component={MapPage} />
            <PrivateRoute
              path="/hospitals"
              isAuth={isAuth}
              component={HospitalsPage}
            />
            <PrivateRoute path="/users" isAuth={isAuth} component={UsersPage} />
            {isAuth && <Redirect path={"/connexion"} to="/" />}
            <Route
              path="/connexion"
              render={(props) => (
                <ConnexionPage onLogin={setIsAuth} {...props} />
              )}
            />
            <PrivateRoute path={"/"} isAuth={isAuth} component={HomePage} />
          </Switch>
          <Footer />
        </main>
      </HashRouter>
      {/* Configuration notification */}
      <ToastContainer
        className="toast-container"
        position={toast.POSITION.BOTTOM_LEFT}
        transition={Zoom}
        autoClose={4000}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        newestOnTop={true}
        toastClassName="bg-dark toa"
      />
    </>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
