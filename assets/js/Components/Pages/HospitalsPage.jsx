import React, { useEffect, useState, useRef } from "react";
import Header from "../Header";
import { toast } from "react-toastify";
import FieldInscription from "../Forms/FieldInscription";
import authAPI from "../Services/authAPI";
import hospitalsAPI from "../Services/hospitalsAPI";
import SelectUsers from "../Forms/SelectUsers";
import SelectProvinces from "../Forms/SelectProvinces";
import cache from "../Services/cache";
import { USERS_API } from "../../config";
import nominatim from "nominatim-geocoder";
import DeletePopup from "../DeletePopup";
import provincesAPI from "../Services/provincesAPI";

const AddHospital = () => {
  const [address, setAddress] = useState("");
  const [listHop, setListHop] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);
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
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setHospitals({ ...hospitals, [name]: value });
  };
  const handleChangeAddress = () => {
    setAddress(refInput.current.value);
  };
  const handleClick = () => {
    setDatas(ref.current.value);
  };
  const handleChangeSelect = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setHospitals({ ...hospitals, [name]: [value] });
  };
  const handleSelect = () => {
    const a = refSelect.current.value;
    let lat = a.split(" ")[0];
    let lon = a.split(" ")[1];
    setHospitals({ ...hospitals, longitude: +lon, latitude: +lat });

    setDisableSubmit(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hospitals)
    try {
      const rep = await hospitalsAPI.addHospital(hospitals);
      toast("L'hôpital " + hospitals.name + " a été ajouté");
      setErrors("");
    } catch (error) {
      toast("Erreur dans le formulaire !" + "", {
        className: "bg-red",
      });
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      // console.log(error.response.data);
    }
  };
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
  // console.log(listHop);
  return (
    <div className="row justify-content-center">
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
        <form onSubmit={handleSubmit}>
          <h5>Ajouter un hôpital</h5>
          <div className="form-group mt-3 mb-2">
            <div className="form-row">
              <FieldInscription
                name="name"
                value={hospitals.name}
                onChange={handleChange}
                placeholder="Nom hôpital"
                error={errors.name}
              />
              <div className="col">
                <div className="btn-group col-12" role="group">
                  <input
                    placeholder="Adresse"
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
              </div>
              {listHop.length > 0 && (
                <div className="col mr-2">
                  <div className="btn-group" role="group">
                    <select
                      className="select-address custom-select"
                      ref={refSelect}
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
                    >
                      Choisir
                    </button>
                  </div>
                </div>
              )}
              <SelectProvinces
                name="province"
                onChange={handleChange}
                value={hospitals.province}
                error={errors.province}
                defaut={"Province"}
              />
              {authAPI.isAdmin() && (
                <div className="ml-3">
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
                  disabled={disableSubmit}
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

const AddProvince = (props) => {
  const [disabled, setdisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
  });
  const [provinces, setProvinces] = useState({
    name: "",
  });
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProvinces({ ...provinces, [name]: value });
    setdisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(provinces);
    try {
      const rep = await provincesAPI.addProvince(provinces);
      toast("La province de " + provinces.name + " a été ajouté");
      setErrors("");
    } catch (error) {
      console.log(error);
      toast("Erreur dans le formulaire !" + "", {
        className: "bg-red",
      });
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      console.log(error.response.data);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xs-9 col-sm-9 col-md-7 col-lg-5">
        <form onSubmit={handleSubmit}>
          <h5>Ajouter une province</h5>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <div className="col-5">
                <FieldInscription
                  name="name"
                  value={provinces.name}
                  onChange={handleChange}
                  placeholder="Province"
                  error={errors.name}
                  size="col-12"
                />
              </div>
              <div className="col-2">
                <button
                  className="btn-secondary btn"
                  type="submit"
                  disabled={disabled}
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

const HospitalsPage = (props) => {
  const [showHospital, setShowHospital] = useState(false);
  const [showProvince, setShowProvince] = useState(false);
  const [hospitals, setHospitals] = useState([]);

  const fetchHospitals = async () => {
    cache.invalidate("hospitals");
    try {
      if (!authAPI.isAdmin()) {
        const data = await hospitalsAPI.find(authAPI.getCurrent().id);
        setHospitals(data);
      } else {
        const data = await hospitalsAPI.findAll();
        setHospitals(data);
      }
    } catch (error) {
      console.log(error.response);
      toast(error + "", {
        className: "bg-red",
      });
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  //     const handleChange = async (id,e) => {
  //         const {value} = e.currentTarget;
  //       try {
  //            const rep = await Axios.put("http://localhost:8000/api/hospitals/" + id, {...users, roles : [value]})
  //            if(authAPI.getCurrent().id == id && value == "USER"){
  //                setTimeout(() => {
  //                    authAPI.logout();
  //                    window.location.replace("/");
  //                   }, 300)
  //                   toast("Role de l'utilisateur n°" + id + " modifié");
  //            }
  //       } catch (error) {
  //           toast(error + "",{
  //               className: 'bg-red',
  //           });
  //           console.log(error);
  //       }
  //   }
  const handleDelete = async (id) => {
    const originHospitals = [...hospitals];
    setHospitals(hospitals.filter((hospitals) => hospitals.id !== id));

    try {
      await hospitalsAPI.deleteHospitals(id);
      toast("Hopital n°" + id + " supprimé", {
        className: "bg-red",
      });
    } catch (error) {
      setHospitals(originHospitals);
      toast(error + "", {
        className: "bg-red",
      });
    }
  };

  return (
    <>
      <Header
        title={
          authAPI.isAdmin() ? "Gestion des hôpitaux" : "Gestion de mes hôpitaux"
        }
        right={
          <>
            {authAPI.isAdmin() && <button
              className="btn-outline-secondary btn mr-1"
              onClick={() => {
                setShowProvince(!showProvince);
                setShowHospital(false);
              }}
            >
              {(!showProvince && "Ajouter province") || "Fermer"}
            </button>}
            <button
              className="btn-outline-secondary btn ml-1"
              onClick={() => {
                setShowHospital(!showHospital);
                setShowProvince(false);
              }}
            >
              {(!showHospital && "Ajouter hôpital") || "Fermer"}
            </button>
          </>
        }
      />
      {(showHospital && (
        <>
          <AddHospital />
          <br />
        </>
      )) ||
        (showProvince && (
          <>
            <AddProvince />
            <br />
          </>
        ))}

      <div className="row justify-content-center">
        <div className="clienttable col-xs-12 col-sm-12 col-md-10 col-lg-8">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                {authAPI.isAdmin() && (
                  <th scope="col" className="text-center">
                    #
                  </th>
                )}
                <th scope="col">Hôpital</th>
                <th scope="col">Province</th>
                <th scope="col" className="text-center">
                  Longitude
                </th>
                <th scope="col" className="text-center">
                  Latitude
                </th>
                <th scope="col" className="text-center">
                  Nombre de cas
                </th>
                {authAPI.isAdmin() && <th scope="col" className="text-center">Utilisateur</th>}
                <th scope="col" className="text-center">
                  \
                </th>
              </tr>
            </thead>
            <tbody>
              {(authAPI.isAdmin() && (
                <>
                  {hospitals.map((hospitals, index) => (
                    <tr key={hospitals.id}>
                      <th scope="row" className="text-center">
                    {console.log(hospitals)}
                        {hospitals.id}
                      </th>
                      <th>{hospitals.name}</th>
                      <td>{hospitals.province.name}</td>
                      <td className="text-center">{hospitals.longitude}</td>
                      <td className="text-center">{hospitals.latitude}</td>
                      <td className="text-center">{hospitals.caseNumber??"/"}</td>
                      {(typeof hospitals.user[0] != "undefined" && (
                        <td className="text-center">
                          {hospitals.user[0].lastName +
                            " " +
                            hospitals.user[0].firstName}
                        </td>
                      )) || <td className="text-center">/</td>}
                      <td className="text-center">
                        <DeletePopup
                          deletepop={() => handleDelete(hospitals.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              )) || (
                <>
                {console.log(hospitals)}
                  {hospitals.map((hospitals) => (
                    <tr key={hospitals.id}>
                      <th scope="row">{hospitals.name}</th>
                      <td>{hospitals.province.name}</td>
                      {console.log(hospitals.province)}
                      <td className="text-center">{hospitals.longitude}</td>
                      <td className="text-center">{hospitals.latitude}</td>
                      <td className="text-center">{hospitals.caseNumber??"/"}</td>
                      <td className="text-center"><DeletePopup
                          deletepop={() => handleDelete(hospitals.id)}
                        /></td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default HospitalsPage;
