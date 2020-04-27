import Axios from 'axios';
import {USERS_API} from '../../config'

function register(user){
    return Axios.post(USERS_API, user);
}
function getAllUsers(){
    return Axios.get(USERS_API)
    .then(response => response.data["hydra:member"]);
}
function deleteUsers(id){
    return Axios
    .delete(USERS_API + "/" + id);
}

export default {
    register,
    getAllUsers,
    deleteUsers
};