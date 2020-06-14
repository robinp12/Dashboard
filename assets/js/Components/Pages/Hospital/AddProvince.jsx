import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import FieldInscription from "../../Forms/FieldInscription";
import provincesAPI from "../../Services/provincesAPI";
import SelectProvince from "../../Forms/SelectProvinces";

const AddProvince = () => {
  const [disabled, setdisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
  });
  const [provinces, setProvinces] = useState({
    name: "",
  });
  const refDel = useRef();
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setProvinces({ ...provinces, [name]: value });
    setdisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rep = await provincesAPI.addProvince(provinces);
      toast("La province de " + provinces.name + " a été ajoutée");
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
  const handleDelete = async () => {
    let nom = refDel.current.selectedOptions[0].innerText;
    try {
      await provincesAPI.deleteProvince(refDel.current.value);
      toast("La province " + nom + " a été supprimée");
    } catch (error) {
      console.log(error);
      toast(
        "Erreur lors de la suppresion de : " +
          nom +
          " ! " +
          " Cette erreur peut provenir du fait que la province soit liée à un ou plusieurs hôpitaux",
        {
          className: "bg-red",
        }
      );
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xs-11 col-sm-11 col-md-9 col-lg-7">
        <form onSubmit={handleSubmit}>
          <h5>Gestion des provinces</h5>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <FieldInscription
                name="name"
                value={provinces.name}
                onChange={handleChange}
                placeholder="Ajouter province"
                error={errors.name}
                size="col-4"
              />
              <button
                className="btn-secondary btn"
                type="submit"
                disabled={disabled}
              >
                Ajouter
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="form-row justify-content-center">
              <SelectProvince
                name="province"
                defaut={"Supprimer province"}
                refe={refDel}
              />
              <div
                className="btn btn-outline-danger col-2"
                type="submit"
                onClick={() => handleDelete()}
              >
                Supprimer
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProvince;
