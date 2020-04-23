import Axios from 'axios';

function register(user){
    return Axios.post("http://localhost:8000/api/users", user);
}
function getAllUsers(){
    return Axios.get("http://localhost:8000/api/users")
    .then(response => response.data["hydra:member"]);
}
function deleteUsers(id){
    return Axios
    .delete("api/users/" + id);
}

export default {
    register,
    getAllUsers,
    deleteUsers
};