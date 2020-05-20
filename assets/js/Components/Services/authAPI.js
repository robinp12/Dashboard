import Axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../../config";
import cache from "./cache";

function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
  cache.invalidate("hospitals");
  cache.invalidate("hospitalsMap");
  cache.invalidate("users");
  cache.invalidate("datas");
}

function authenticate(login) {
  return Axios.post(LOGIN_API, login)
    .then((response) => response.data.token)
    .then((token) => {
      //Token Login
      window.localStorage.setItem("authToken", token);
      setToken(token);
    });
}

function setToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      setToken(token);
    }
  }
}

function isAuth() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}
function isAdmin() {
  const token = window.localStorage.getItem("authToken");
  if (jwtDecode(token).roles.includes("SUPERADMIN")||jwtDecode(token).roles.includes("ADMIN")) {
    return true;
  }
  return false;
}
function getCurrent() {
  const token = window.localStorage.getItem("authToken");
  return jwtDecode(token);
}

export default {
  authenticate,
  logout,
  setup,
  isAuth,
  isAdmin,
  getCurrent,
};
