import React, {useEffect, useState} from "react";
import axios from 'axios';
import Header from "../Header";
import usersAPI from "../Services/usersAPI";
import Select from "../Forms/Select";
import FieldInscription from "../Forms/FieldInscription";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";


const AddUser = props => {

    const [users, setUsers] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "password2020",
    });
    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        roles: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUsers({...users, [name] : value});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const rep = await usersAPI.register(users)
            toast(users.firstName +" a été ajouté");
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
                            name="lastName" 
                            value={users.lastName} 
                            onChange={handleChange} 
                            placeholder="Nom"
                            error={errors.lastName} 
                        />
                        <FieldInscription
                            name="firstName" 
                            value={users.firstName} 
                            onChange={handleChange} 
                            placeholder="Prénom"
                            error={errors.firstName} 
                        />
                        <FieldInscription
                            name="email" 
                            value={users.email} 
                            onChange={handleChange} 
                            type="email"
                            placeholder="Email"
                            error={errors.email} 
                        />
                        <FieldInscription
                            name="password" 
                            value={users.password} 
                            onChange={handleChange} 
                            type="password"
                            placeholder="Mot de Passe"
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

const UsersPage = props => {
    const[show, setShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users")
            .then(response => response.data["hydra:member"])
            .then(data => setUsers(data))
            .catch(error => {
                console.log(error.response.data)
                toast(error + "",{
                    className: 'bg-red',
                });
            });
    }, []);

    const handleDelete = (id) => {

        const originUsers = [...users];
        setUsers(users.filter(users => users.id !== id))

        axios
        .delete("api/users/" + id)
        .then(rep => { 
            console.log(rep);
            toast("Utilisateur n°"+ id +" supprimé",{
                className: 'bg-red',
            });
        })
        .catch(error => {
            setUsers(originUsers);
            toast(error + "",{
                className: 'bg-red',
            });
            console.log(error);
        })
    };

    return(
        <>
        <Header title="Liste Utilisateur" other={<button className="btn-outline-secondary btn" onClick={() => setShow(!show)}>{!show && "Ajouter" || "Fermer"}</button>}/>
        {show && <><AddUser/><br/></>}
        <div className="row justify-content-center">
            <div className="clienttable col-xs-12 col-sm-12 col-md-10 col-lg-8">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">\</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(users =>
                        <tr key={users.id}>
                            <th scope="row">{users.id}</th>
                            <td>{users.lastName}</td>
                            <td>{users.firstName}</td>
                            <td>{users.email}</td>
                                {users.roles == "ADMIN" && (
                                <>
                                <td>
                                    {users.roles}
                                </td>
                                <td>
                                    <button 
                                        disabled 
                                        className="btn btn-danger">X
                                    </button>
                                </td>
                                </>
                                ) || (
                                <>
                                <td>
                                    {/* <Select 
                                    name="role" 
                                    value={users.role} 
                                    className=""
                                    />*/}
                                    {users.roles}
                                </td>
                                <td>
                                    <Popup
                                    trigger={<button className="btn btn-danger">X </button>}
                                    position="right top"
                                    closeOnDocumentClick
                                    >
                                    {close => (
                                        <div className="popup">
                                            <span>Voulez-vous vraiment supprimer l'élément ?</span>
                                            <button className="btn btn-outline-danger mr-1" onClick={() => handleDelete(users.id)}>Oui</button>
                                            <button className="btn btn-outline-secondary ml-1" onClick={close}>Non</button>
                                        </div>)}
                                    </Popup>
                                </td>
                                </>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
export default UsersPage;