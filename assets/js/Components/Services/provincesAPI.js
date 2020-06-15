import Axios from "axios";
import { PROVINCES_API } from "../../config";
// Recuperer chaaue province
async function findAll() {
  return Axios.get(PROVINCES_API).then((response) => {
    const provinces = response.data["hydra:member"];
    return provinces;
  });
}
// Ajouter une province
function addProvince(province) {
  return Axios.post(PROVINCES_API, province).then(async (response) => {
    return response;
  });
}
//Supprimer une province
function deleteProvince(id) {
  return Axios.delete(id)
    .then(async (response) => {
      return response;
    })
}
export default {
  findAll,
  addProvince,
  deleteProvince,
};
