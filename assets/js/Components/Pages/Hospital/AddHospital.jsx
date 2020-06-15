import nominatim from "nominatim-geocoder";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { USERS_API } from "../../../config";
import FieldInscription from "../../Forms/FieldInscription";
import SelectProvinces from "../../Forms/SelectProvinces";
import SelectUsers from "../../Forms/SelectUsers";
import authAPI from "../../Services/authAPI";
import hospitalsAPI from "../../Services/hospitalsAPI";

const AddHospital = () => {
  const [address, setAddress] = useState("");
  const [listHop, setListHop] = useState([]);
  const refInput = useRef();
  const refSelect = useRef();

  const [hospitals, setHospitals] = useState({
    user: authAPI.isAdmin() ? [] : [USERS_API + "/" + authAPI.getCurrent().id],
    name: "",
    province: undefined,
    longitude: undefined,
    latitude: undefined,
  });

  const [errors, setErrors] = useState({
    name: "",
    province: "",
  });
  //Valeur mise dans le state
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setHospitals({ ...hospitals, [name]: value });
  };

  const handleChangeAddress = () => {
    setAddress(refInput.current.value);
  };

  const handleChangeSelect = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setHospitals({ ...hospitals, [name]: [value] });
  };
  // Coordonnes GPS dans la table hospital
  const handleSelect = () => {
    const a = refSelect.current.value;
    let lat = a.split(" ")[0];
    let lon = a.split(" ")[1];
    setHospitals({ ...hospitals, longitude: +lon, latitude: +lat });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep = await hospitalsAPI.addHospital(hospitals);
      toast("L'hôpital " + hospitals.name + " a été ajouté");
      setErrors("");
    } catch (error) {
      toast("Erreur dans le formulaire !" + "", {
        className: "bg-red",
      });
      // Verification des erreurs a afficher provenant du backend
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
    }
  };
  // API permettant de traduire l'adresse en coord GPS
  const geocoder = new nominatim({
    delay: 1000, // delay between requests
    secure: true, // enables ssl
    host: "nominatim.openstreetmap.org",
  });
  geocoder
    .search({ q: address })
    .then((response) => {
      setListHop(response);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="row justify-content-center">
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
        <form onSubmit={handleSubmit}>
          <h5>Ajouter un hôpital</h5>
          <div className="form-group mt-3 mb-2 justify-content-center">
            <div className="row">
              <FieldInscription
                name="name"
                value={hospitals.name}
                onChange={handleChange}
                placeholder="Nom hôpital"
                error={errors.name}
                size="col-3"
              />

              <div className="btn-group col-4" role="group">
                <input
                  placeholder="Adresse (Rue ...)"
                  ref={refInput}
                  className={"form-control"}
                />
                <button
                  onClick={handleChangeAddress}
                  type="button"
                  className="btn btn-outline-dark"
                >
                  Verifier
                </button>
              </div>
              <div className="col-4">
                <div className="btn-group" role="group">
                  <select
                    className="select-address custom-select col-12"
                    ref={refSelect}
                    disabled={!listHop.length > 0}
                  >
                    {listHop.map((e) => (
                      <option key={e.osm_id} value={e.lon + " " + e.lat}>
                        {e.display_name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleSelect}
                    type="button"
                    className="btn btn-outline-success"
                    disabled={!listHop.length > 0}
                  >
                    Choisir
                  </button>
                </div>
              </div>
            </div>
            <br />
            <div className="row justify-content-center">
              <SelectProvinces
                name="province"
                onChange={handleChange}
                value={hospitals.province}
                error={errors.province}
                defaut={"Province"}
              />
              {authAPI.isAdmin() && (
                <div className="col-3">
                  <SelectUsers
                    name="user"
                    value={hospitals.user[0]}
                    onChange={handleChangeSelect}
                    placeholder="Utilisateur"
                    error={errors.user}
                    defaut={"Utilisateur"}
                  />
                </div>
              )}
              <div>
                <button
                  className="btn-secondary btn ml-2"
                  type="submit"
                  disabled={
                    !(
                      hospitals.name &&
                      hospitals.province &&
                      hospitals.latitude &&
                      hospitals.longitude
                    )
                  }
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddHospital;
