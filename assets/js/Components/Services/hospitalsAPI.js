import Axios from 'axios';

function findAll() {
    return Axios.get("http://localhost:8000/api/hospitals")
    .then(response => response.data["hydra:member"]);
}
function addHospital(hospital){
    return Axios.post("http://localhost:8000/api/hospitals", hospital);
}
function deleteHospitals(id){
    return Axios
    .delete("api/hospitals/" + id);
}
export default {
    findAll,
    addHospital,
    deleteHospitals
}