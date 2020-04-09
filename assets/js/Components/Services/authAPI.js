import Axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout(){
    window.localStorage.removeItem("authToken");
    delete Axios.defaults.headers["Authorization"];
}

function authenticate(login) {
    return Axios
    .post("http://localhost:8000/api/login_check", login)
    .then(response => response.data.token)
    .then(token => {
        window.localStorage.setItem("authToken", token);   
        setToken(token);
    });
}

function setToken(token){
    Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp} = jwtDecode(token);
        if(exp * 1000 > new Date().getTime()){
            setToken(token);        
        }
    }
}

function isAuth(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp} = jwtDecode(token);
        if(exp * 1000 > new Date().getTime()){
            return true;        
        }
        return false;
    }
    return false;
}

export default{
    authenticate,
    logout,
    setup,
    isAuth
}