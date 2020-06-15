import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Header from "../../Header";
import DeletePopup from "../../PopupDelete";
import authAPI from "../../Services/authAPI";
import cache from "../../Services/cache";
import hospitalsAPI from "../../Services/hospitalsAPI";
import AddHospital from "./AddHospital";
import AddProvince from "./AddProvince";

const HospitalsPage = () => {
  const [showHospital, setShowHospital] = useState(false);
  const [showProvince, setShowProvince] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [caseNumber, setCaseNumber] = useState({
    caseNumber: null,
  });
  const handleChangeNb = async (id, e, caseId) => {
    const { value } = e.currentTarget;
    cache.invalidate("hospitalsMap");
    console.log(id, +value, caseNumber, caseId);
    try {
      if (isNaN(caseId)) {
        await hospitalsAPI.createCase(id, +value, caseNumber);
      } else {
        await hospitalsAPI.updateCase(id, +value, caseNumber, caseId);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            {authAPI.getCurrent().roles.includes("SUPERADMIN") && (
              <button
                className="btn-outline-secondary btn mr-1"
                onClick={() => {
                  setShowProvince(!showProvince);
                  setShowHospital(false);
                }}
              >
                {(!showProvince && "Gestion des provinces") || "Fermer"}
              </button>
            )}
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
        <div className="listeH clienttable col-xs-12 col-sm-12 col-md-10 col-lg-8">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                {authAPI.isAdmin() && (
                  <th scope="col" className="text-center">
                    #
                  </th>
                )}
                <th className="text-center" scope="col">Hôpital</th>
                <th scope="col" className="text-center">
                  Province
                </th>
                <th scope="col" className="text-center">
                  Patients infectés
                </th>
                {authAPI.isAdmin() && (
                  <th scope="col" className="text-center">
                    Utilisateur
                  </th>
                )}
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
                        {hospitals.id}
                      </th>
                      <th className="text-center">{hospitals.name}</th>
                      <td className="text-center">{hospitals.province.name}</td>
                      <td className="text-center">
                        <input
                          type="number"
                          name="caseNumber"
                          defaultValue={caseNumber.caseNumber}
                          onChange={(e) =>
                            handleChangeNb(
                              hospitals.id,
                              e,
                              hospitals?.caseNumber?.id
                            )
                          }
                          className="form-control col-3 m-auto text-center"
                          placeholder={hospitals?.caseNumber?.caseNumber}
                        />
                      </td>
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
                  {hospitals.map((hospitals) => (
                    <tr key={hospitals.id}>
                      <th className="text-center" scope="row">{hospitals.name}</th>
                      <td className="text-center">{hospitals.province.name}</td>
                      <td className="text-center">
                        <input
                          type="number"
                          name="caseNumber"
                          defaultValue={caseNumber.caseNumber}
                          onChange={(e) =>
                            handleChangeNb(
                              hospitals.id,
                              e,
                              hospitals?.caseNumber?.id
                            )
                          }
                          className="form-control col-3 m-auto text-center"
                          placeholder={hospitals?.caseNumber?.caseNumber}
                        />
                      </td>
                      <td className="text-center">
                        <DeletePopup
                          deletepop={() => handleDelete(hospitals.id)}
                        />
                      </td>
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
