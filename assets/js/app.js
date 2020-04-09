import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import '../css/App.css';
import Navbar from '../js/Components/Navbar';
import HomePage from "../js/Components/Pages/HomePage";
import ConnexionPage from "../js/Components/Pages/ConnexionPage";
import InscriptionPage from "../js/Components/Pages/InscriptionPage";
import UserList from './Components/UserList';
import UnitList from './Components/UnitList';
import Footer from './Components/Footer';
import Test from './Components/Test';

const App = () => {
    return (
        <HashRouter>
          <Navbar/>
          <main className="jumbotron">
              <Switch>
                <Route path="/test" component={Test}/>
                <Route path="/units" component={UnitList}/>
                <Route path="/users" component={UserList}/>
                <Route path="/connexion" component={ConnexionPage}/>
                <Route path="/inscription" component={InscriptionPage}/>
                <Route path={"/"} component={HomePage}/>
              </Switch>
              <Footer/>
          </main>
        </HashRouter>
    );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);