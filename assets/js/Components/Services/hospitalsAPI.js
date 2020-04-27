import Axios from 'axios';
import {HOSPITALS_API} from '../../config'

function findAll() {
    return Axios.get(HOSPITALS_API)
    .then(response => response.data["hydra:member"]);
}
function addHospital(hospital){
    return Axios.post(HOSPITALS_API, hospital);
}
function deleteHospitals(id){
    return Axios
    .delete(HOSPITALS_API + "/" + id);
}
export default {
    findAll,
    addHospital,
    deleteHospitals
}