import Axios from "axios";
import { HOSPITALS_API, USERS_API, CASE_API } from "../../config";
import Cache from "./cache";

async function findAll() {
  const cachedHospitals = await Cache.get("hospitals");

  if (cachedHospitals) {
    return cachedHospitals;
  } else {
    return Axios.get(HOSPITALS_API).then((response) => {
      const hospitals = response.data["hydra:member"];
      Cache.set("hospitals", hospitals);
      return hospitals;
    });
  }
}
function createCase(id, value, casenumber) {
  return Axios.post(CASE_API, {
    ...casenumber,
    caseNumber: value,
    hospital: "/api/hospitals/" + id,
  });
}
function updateCase(id, value, casenumber, caseId) {
  return Axios.put(CASE_API + "/" + caseId, {
    ...casenumber,
    caseNumber: value,
    hospital: "/api/hospitals/" + id,
  });
}
async function findAllMap() {
  const cachedHospitals = await Cache.get("hospitalsMap");

  if (cachedHospitals) {
    return cachedHospitals;
  } else {
    return Axios.get(HOSPITALS_API).then((response) => {
      const hospitals = response.data["hydra:member"];
      Cache.set("hospitalsMap", hospitals);
      return hospitals;
    });
  }
}
async function find(id) {
  const cachedHospitals = await Cache.get("hospitals");

  if (cachedHospitals) {
    return cachedHospitals;
  } else {
    return Axios.get(USERS_API + "/" + id).then((response) => {
      const hospitals = response.data.hospitals;
      Cache.set("hospitals", hospitals);
      return hospitals;
    });
  }
}

function addHospital(hospital) {
  return Axios.post(HOSPITALS_API, hospital).then(async (response) => {
    Cache.invalidate("hospitalsMap");
    const cachedHospitals = await Cache.get("hospitals");
    if (cachedHospitals) {
      Cache.set("hospitals", [...cachedHospitals, response.data]);
    }
    return response;
  });
}
function addCase(case_number) {
  return Axios.post(CASE_API, case_number).then(async (response) => {
    return response;
  });
}
function deleteHospitals(id) {
  return Axios.delete(HOSPITALS_API + "/" + id).then(async (response) => {
    Cache.invalidate("hospitalsMap");
    const cachedHospitals = await Cache.get("hospitals");

    if (cachedHospitals) {
      Cache.set(
        "hospitals",
        cachedHospitals.filter((e) => e.id !== id)
      );
    }
    return response;
  });
}
export default {
  findAll,
  createCase,
  updateCase,
  findAllMap,
  find,
  addHospital,
  deleteHospitals,
  addCase,
};
