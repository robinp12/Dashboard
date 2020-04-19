import Axios from 'axios';

function register(user){
    return Axios.post("http://localhost:8000/api/users", user);
}
function getHopitaux(){
    return Axios.get("http://localhost:8000/api/hospitals");
}
export default {
    register,
    getHopitaux
};