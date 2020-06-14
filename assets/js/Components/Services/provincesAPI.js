import Axios from "axios";
import { PROVINCES_API } from "../../config";

async function findAll() {
  return Axios.get(PROVINCES_API).then((response) => {
    const provinces = response.data["hydra:member"];
    return provinces;
  });
}
function addProvince(province) {
  return Axios.post(PROVINCES_API, province).then(async (response) => {
    console.log(response);
    return response;
  });
}
function deleteProvince(id) {
  return Axios.delete(id)
    .then(async (response) => {
      console.log(response);
      return response;
    })
    .then(async (response) => {
      console.log(response);
      return response;
    });
}
export default {
  findAll,
  addProvince,
  deleteProvince,
};
