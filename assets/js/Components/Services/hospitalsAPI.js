import Axios from 'axios';
import {HOSPITALS_API, USERS_API} from '../../config';
import Cache from './cache';

async function findAll() {
    const cachedHospitals = await Cache.get("hospitals");

    if(cachedHospitals) {
        return cachedHospitals
    }
    else{
        return Axios.get(HOSPITALS_API)
        .then(response => {
            const hospitals = response.data["hydra:member"];
            Cache.set("hospitals", hospitals)
            return hospitals;
        });
    }
}
async function findAllMap() {
    const cachedHospitals = await Cache.get("hospitalsMap");

    if(cachedHospitals) {
        return cachedHospitals
    }
    else{
        return Axios.get(HOSPITALS_API)
        .then(response => {
            const hospitals = response.data["hydra:member"];
            Cache.set("hospitalsMap", hospitals)
            return hospitals;
        });
    }
}
async function find(id) {
    const cachedHospitals = await Cache.get("hospitals");

    if(cachedHospitals) {
        return cachedHospitals
    }
    else{
        return Axios.get(USERS_API + "/" + id)
        .then(response => {
            const hospitals = response.data.hospitals;
            Cache.set("hospitals", hospitals)
            console.log(response.data)
            return hospitals;
        });
    }
}

function addHospital(hospital){
    return Axios
    .post(HOSPITALS_API, hospital)
    .then(async response => {
        Cache.invalidate("hospitalsMap");
        const cachedHospitals = await Cache.get("hospitals");
        if(cachedHospitals) {
            Cache.set("hospitals", [...cachedHospitals, response.data]);
        }
        return response;
    });
}
function deleteHospitals(id){
    return Axios
    .delete(HOSPITALS_API + "/" + id)
    .then(async response => {
        Cache.invalidate("hospitalsMap");
        const cachedHospitals = await Cache.get("hospitals");

        if(cachedHospitals) {
            Cache.set("hospitals", cachedHospitals.filter(e => e.id !== id));
        }
        return response;
    })
}
export default {
    findAll,
    findAllMap,
    find,
    addHospital,
    deleteHospitals
}