import React, {useEffect, useState} from "react";
import axios from 'axios';
import Header from "../Header";
import FieldConnexion from "../Forms/FieldConnexion"
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import FieldInscription from "../Forms/FieldInscription";
import Axios from "axios";


const AddHospital = props => {

    const [hospitals, setHospitals] = useState({
        user: "",
        name: "",
        province: "",
        longitude: "",
        latitude: "",
    });
    const [errors, setErrors] = useState({
        user: "",
        name: "",
        province: "",
        longitude: "",
        latitude: "",
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setHospitals({...hospitals, [name] : value});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const rep = await Axios.post("http://localhost:8000/api/hospitals", hospitals);
            toast(hospitals.firstName +" a été ajouté");
            console.log(rep.data);
        } catch (error) {
            toast(error + "",{
                className: 'bg-red',
            });
            console.log(error);
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
                            name="user" 
                            value={hospitals.user} 
                            onChange={handleChange} 
                            placeholder="Utilisateur"
                            error={errors.user} 
                        />
                        <FieldInscription
                            name="name" 
                            value={hospitals.name} 
                            onChange={handleChange} 
                            placeholder="Nom"
                            error={errors.name} 
                        />
                        <FieldInscription
                            name="province" 
                            value={hospitals.province} 
                            onChange={handleChange} 
                            placeholder="Province"
                            error={errors.province} 
                        />
                        <FieldInscription
                            name="longitude" 
                            value={hospitals.longitude} 
                            onChange={handleChange} 
                            placeholder="Longitude"
                        />
                        <FieldInscription
                            name="latitude" 
                            value={hospitals.latitude} 
                            onChange={handleChange} 
                            placeholder="Latitude"
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


    useEffect(() => {
        axios.get("http://localhost:8000/api/hospitals")
            .then(response => response.data["hydra:member"])
            .then(data => setHospitals(data))
            .catch(error => {
                console.log(error.response.data)
                toast(error + "",{
                    className: 'bg-red',
                });
            });
    }, []);

    const handleDelete = (id) => {

        const originHospitals = [...hospitals];
        setHospitals(hospitals.filter(hospitals => hospitals.id !== id))

        axios
        .delete("api/hospitals/" + id)
        .then(rep => { 
            console.log(rep);
            toast("Hopital n°"+ id +" supprimé",{
                className: 'bg-red',
            });
        })
        .catch(error => {
            setHospitals(originHospitals);
            toast(error + "",{
                className: 'bg-red',
            });
            console.log(error);
        })
    };

    return(
        <>
        <Header title="Liste hopitaux" other={<button className="btn-outline-secondary btn" onClick={() => setShow(!show)} >{!show && "Ajouter" || "Fermer"}</button>}/>
        {show && <><AddHospital/></>}
        <div className="clienttable">
        <table className="table table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col">#</th>
                    <th scope="col">Hopital</th>
                    <th scope="col">Province</th>
                    <th scope="col">Longitude</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Utilisateur</th>
                    <th scope="col">\</th>

                </tr>
            </thead>
            <tbody>
            {hospitals.map(hospitals =>
                <tr key={hospitals.id}>
                    <th scope="row">{hospitals.id}</th>
                    <th>{hospitals.name}</th>
                    <td>{hospitals.province}</td>
                    <td>{hospitals.longitude}</td>
                    <td>{hospitals.latitude}</td>
                    <td>{hospitals.user.lastName+" "+hospitals.user.firstName}</td>
                    <td>
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
                </tr>)}
            </tbody>
        </table>
        </div>
        </>
    )
}
export default HospitalsPage;