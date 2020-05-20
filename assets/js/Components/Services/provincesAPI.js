import Axios from "axios";
import { PROVINCES_API } from "../../config";

async function findAll() {
  return Axios.get(PROVINCES_API).then((response) => {
    const provinces = response.data["hydra:member"];
    return provinces;
  });
}
export default {
    findAll
}