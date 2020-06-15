export const API_URL = process.env.API_URL;

// Regroupement dans un fichier pour surcharger sur heroku
export const USERS_API = API_URL + "users";
export const HOSPITALS_API = API_URL + "hospitals";
export const PROVINCES_API = API_URL + "provinces";
export const CASE_API = API_URL + "case_numbers";
export const LOGIN_API = API_URL + "login_check";