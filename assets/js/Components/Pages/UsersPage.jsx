import React, {useEffect, useState} from "react";
import Header from "../Header";
import usersAPI from "../Services/usersAPI";
import Select from "../Forms/Select";
import FieldInscription from "../Forms/FieldInscription";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import authAPI from "../Services/authAPI";
import Axios from "axios";


const AddUser = props => {

    const [users, setUsers] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "password2020",
        roles: []
    });
    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        roles: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUsers({...users, [name] : value});
    };
    const handleChangeSelect = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUsers({...users, [name] : [value]});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const rep = await usersAPI.register(users)
            toast(users.firstName +" a été ajouté");
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
                            error={errors.password}
                        />
                           <Select 
                           name="roles" 
                           onChange={handleChangeSelect} 
                           value={users.roles[0]} 
                           defaut={"Accès"}
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

    const fetchUsers = async () => {
        try {
            const data = await usersAPI.getAllUsers();
            setUsers(data);
            console.log(data)
        } catch (error) {
            console.log(error.response)
            toast(error + "",{
                className: 'bg-red',
            });
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);
    const handleChange = async (id,e) => {
          const {value} = e.currentTarget;
        try {
             const rep = await Axios.put("http://localhost:8000/api/users/" + id, {...users, roles : [value]})
             if(authAPI.getCurrent().id == id && value == "USER"){
                 setTimeout(() => {
                     authAPI.logout();
                     window.location.replace("/");
                    }, 300)           
                    toast("Role de l'utilisateur n°" + id + " modifié");
             }
        } catch (error) {
            toast(error + "",{
                className: 'bg-red',
            });
            console.log(error);
        }
    }

    const handleDelete = async id => {
        const originUsers = [...users];
        setUsers(users.filter(users => users.id !== id))

        try {
            await usersAPI.deleteUsers(id)
            toast("Utilisateur n°"+ id +" supprimé",{
                className: 'bg-red',
            });
        } catch (error) {
            setUsers(originUsers);
            toast(error + "",{
                className: 'bg-red',
            });
        }
    };

    return(
        <>
        {authAPI.isAdmin() && <>
        <Header title="Liste Utilisateur" other={<button className="btn-outline-secondary btn" onClick={() => setShow(!show)}>{!show && "Ajouter" || "Fermer"}</button>}/>
        {show && <><AddUser/><br/></>}
        <div className="row justify-content-center">
            <div className="clienttable col-xs-12 col-sm-12 col-md-10 col-lg-8">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col" className="text-center">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col" className="text-center">Role</th>
                            {authAPI.isAdmin() && (
                            <th scope="col" className="text-center">\</th>)}

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(users =>
                        <tr key={users.id}>
                            <th scope="row" className="text-center">{users.id}</th>
                            <td>{users.lastName}</td>
                            <td>{users.firstName}</td>
                            <td>{users.email}</td>
                                {users.email == "robipaq@hotmail.com" && (
                                <>
                                <td className="text-center">
                                    {users.roles}
                                </td>
                                <td className="text-center">
                                </td>
                                </>
                                ) || (
                                <>
                                <td className="text-center">
                                    <Select 
                                    name="role" 
                                    value={users.role} 
                                    className=""
                                    onChange={(e) => handleChange(users.id,e)}
                                    defaut={users.roles}
                                    />
                                </td>
                                <td className="text-center">
                                    {authAPI.getCurrent().username == "robipaq@hotmail.com"  && (
                                    <Popup
                                    trigger={<button className="btn btn-sm btn-danger">X </button>}
                                    position="right top"
                                    closeOnDocumentClick
                                    >
                                    {close => (
                                        <div className="popup">
                                            <span>Voulez-vous vraiment supprimer l'élément ?</span>
                                            <button className="btn btn-outline-danger mr-1" onClick={() => handleDelete(users.id)}>Oui</button>
                                            <button className="btn btn-outline-secondary ml-1" onClick={close}>Non</button>
                                        </div>)}
                                    </Popup>)}
                                </td>
                                </>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
        </>}
        </>
    )
}
export default UsersPage;