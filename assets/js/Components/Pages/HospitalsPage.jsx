import React, {useEffect, useState} from "react";
import Header from "../Header";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import FieldInscription from "../Forms/FieldInscription";
import authAPI from "../Services/authAPI";
import hospitalsAPI from "../Services/hospitalsAPI";
import SelectUsers from "../Forms/SelectUsers";
import SelectProvinces from "../Forms/SelectProvinces";


const AddHospital = props => {

    const [hospitals, setHospitals] = useState({
        user: [],
        name: "",
        province: "",
        longitude: undefined,
        latitude: undefined,
    });
    const [errors, setErrors] = useState({
        name: "",
        province: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setHospitals({...hospitals, [name] : value});
    };
    const handleChangeNb = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setHospitals({...hospitals, [name] : isNaN(value)?0:value});
    };
    const handleChangeSelect = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setHospitals({...hospitals, [name] : [value]});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const rep = await hospitalsAPI.addHospital(hospitals)
            toast(hospitals.name +" a été ajouté");
            setErrors("");
        } catch (error) {
            toast("Erreur dans le formulaire !" + "",{
                className: 'bg-red',
            });
            if(error.response.data.violations){
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
             }
             console.log(error.response.data)
        }
    };
    return (
        <>
        <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
                <form  onSubmit={handleSubmit}>
                <h5>Ajouter utilisateur</h5>
                <div className="form-group mb-2">
                    <div className="form-row">
                        <FieldInscription
                            name="name" 
                            value={hospitals.name} 
                            onChange={handleChange} 
                            placeholder="Nom hôpital"
                            error={errors.name} 
                        />
                        <SelectProvinces 
                            name="province" 
                            onChange={handleChange} 
                            value={hospitals.province}
                            error={errors.province}
                            defaut={"Province"}
                        />
                        <FieldInscription
                            name="longitude" 
                            value={hospitals.longitude} 
                            onChange={handleChangeNb} 
                            placeholder="Longitude"
                            error={errors.longitude}
                        />
                        <FieldInscription
                            name="latitude" 
                            value={hospitals.latitude} 
                            onChange={handleChangeNb} 
                            placeholder="Latitude"
                            error={errors.latitude}
                        />
                        <SelectUsers 
                            name="user" 
                            value={hospitals.user[0]} 
                            onChange={handleChangeSelect} 
                            placeholder="Utilisateur"
                            error={errors.user} 
                            defaut={"Utilisateur"}
                        />
                        <div className="col">
                            <button className="btn-secondary btn ml-2" type="submit">
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

const HospitalsPage = props => {

    const[show, setShow] = useState(false);
    const [hospitals, setHospitals] = useState([]);

    const fetchHospitals = async () => {
        try {
            const data = await hospitalsAPI.findAll();
            setHospitals(data);
        } catch (error) {
            console.log(error.response)
            toast(error + "",{
                className: 'bg-red',
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
    const handleDelete = async id => {
        const originHospitals = [...hospitals];
        setHospitals(hospitals.filter(hospitals => hospitals.id !== id))

        try {
           await hospitalsAPI.deleteHospitals(id)
            toast("Hopital n°"+ id +" supprimé",{
                className: 'bg-red',
            });
        } catch (error) {
            setHospitals(originHospitals);
            toast(error + "",{
                className: 'bg-red',
            });
        }
    };

    return(
        <>
        <Header title="Liste hopitaux" other={<button className="btn-outline-secondary btn" onClick={() => setShow(!show)} >{!show && "Ajouter" || "Fermer"}</button>}/>
        {show && <><AddHospital/></>}
        <div className="clienttable row justify-content-center">
        <table className="table table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col" className="text-center" >#</th>
                    <th scope="col">Hôpital</th>
                    <th scope="col">Province</th>
                    <th scope="col" className="text-center">Longitude</th>
                    <th scope="col" className="text-center">Latitude</th>
                    {authAPI.isAdmin() && 
                    <th scope="col">Utilisateur</th>}
                    <th scope="col" className="text-center">\</th>

                </tr>
            </thead>
            <tbody>
            {hospitals.map(hospitals =>
                <tr key={hospitals.id}>
                    <th scope="row" className="text-center">{hospitals.id}</th>
                    <th>{hospitals.name}</th>
                    <td>{hospitals.province}</td>
                    <td className="text-center">{hospitals.longitude}</td>
                    <td className="text-center">{hospitals.latitude}</td>
                    {typeof(hospitals.user[0]) != "undefined" && 
                    (<td>{hospitals.user[0].lastName+" "+hospitals.user[0].firstName}{console.log(hospitals.user[0].id == authAPI.getCurrent().id) }
                    </td>) || (<td></td>)
                    }
                    <td className="text-center">
                        <Popup
                            trigger={<button className="btn btn-danger">X </button>}
                            position="right top"
                            closeOnDocumentClick
                            >
                            {close => (
                                <div className="popup">
                                    <span>Voulez-vous vraiment supprimer l'élément ?</span>
                                    <button className="btn btn-outline-danger mr-1" onClick={() => handleDelete(hospitals.id)}>Oui</button>
                                    <button className="btn btn-outline-secondary ml-1" onClick={close}>Non</button>
                                </div>)}
                        </Popup>
                    </td>
                
                </tr>
            )}
            </tbody>
        </table>
        </div>
        </>
    )
}
export default HospitalsPage;