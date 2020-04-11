import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import '../css/App.css';
import Navbar from '../js/Components/Navbar';
import HomePage from "../js/Components/Pages/HomePage";
import ConnexionPage from "../js/Components/Pages/ConnexionPage";
import InscriptionPage from "../js/Components/Pages/InscriptionPage";
import UserList from './Components/UserList';
import UnitList from './Components/UnitList';
import Footer from './Components/Footer';
import Test from './Components/Test';
import authAPI from './Components/Services/authAPI';
import MapPage from './Components/Pages/MapPage';

authAPI.setup();

const PrivateRoute = ({path, isAuth, component}) => 
  isAuth?(<Route path={path} component={component}/>):(<Redirect to="/connexion"/>);

const App = () => {

  const [isAuth, setIsAuth] = useState(authAPI.isAuth());
  const NavbarWithRouter = withRouter(Navbar);

    return (
      <HashRouter>
      <NavbarWithRouter isAuth={isAuth} onLogout={setIsAuth} />
        <main className="jumbotron">
          <Switch>
            <Route path="/test" isAuth={isAuth} component={Test}/>
            <PrivateRoute path="/map" isAuth={isAuth} component={MapPage}/>
            <PrivateRoute path="/units" isAuth={isAuth} component={UnitList}/>
            <PrivateRoute path="/users" isAuth={isAuth} component={UserList} />
            {isAuth && 
              <Route path={"/connexion" && "/inscription"} 
              render={() => <Redirect to={"/"} />}/>
            || 
              <>
                <Route path="/inscription" component={InscriptionPage}/>
                <Route 
                  path="/connexion" 
                  render={props => <ConnexionPage onLogin={setIsAuth} {...props} />}
                />
              </>
            }
            <PrivateRoute path={"/"} isAuth={isAuth} component={HomePage}/>
          </Switch>
        <Footer/>
        </main>
      </HashRouter>
    );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);