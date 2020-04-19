import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import '../css/App.css';
import Navbar from '../js/Components/Navbar';
import HomePage from "../js/Components/Pages/HomePage";
import ConnexionPage from "../js/Components/Pages/ConnexionPage";
import UsersPage from './Components/Pages/UsersPage';
import Footer from './Components/Footer';
import Test from './Components/Test';
import authAPI from './Components/Services/authAPI';
import MapPage from './Components/Pages/MapPage';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HospitalsPage from './Components/Pages/HospitalsPage';

authAPI.setup();

const PrivateRoute = ({path, isAuth, component}) => 
  isAuth?(<Route path={path} component={component}/>):(<Redirect to="/connexion"/>);
const App = () => {

  const [isAuth, setIsAuth] = useState(authAPI.isAuth());
  const NavbarWithRouter = withRouter(Navbar);

    return (
      <>
      <HashRouter>
      <NavbarWithRouter isAuth={isAuth} onLogout={setIsAuth} />
        <main className="jumbotron">
          <Switch>
            <Route path="/test" isAuth={isAuth} component={Test}/>
            <PrivateRoute path="/map" isAuth={isAuth} component={MapPage}/>
            <PrivateRoute path="/hospitals" isAuth={isAuth} component={HospitalsPage}/>            
            <PrivateRoute path="/users" isAuth={isAuth} component={UsersPage} />
            {isAuth && <Redirect path={"/connexion"} to="/"/>}
            <Route path="/connexion" 
              render={props => <ConnexionPage onLogin={setIsAuth} {...props} />}
            />
            <PrivateRoute path={"/"} isAuth={isAuth} component={HomePage}/>
          </Switch>
        <Footer/>
        </main>
      </HashRouter>
      <ToastContainer 
      className='toast-container'
      position={toast.POSITION.BOTTOM_LEFT} 
      transition={Zoom} 
      autoClose={3000}
      pauseOnFocusLoss={false}
      hideProgressBar={true}
      newestOnTop={true}
      toastClassName="bg-dark toa"/>
      </>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);