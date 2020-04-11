import React, {useEffect, useState} from "react";
import axios from 'axios';
import Header from "./Header";
import InscriptionPage from "./Pages/InscriptionPage";

const UserList = props => {
    const[show, setShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("api/users")
            .then(response => response.data["hydra:member"])
            .then(data => setUsers(data))
            .catch(error => console.log(error.response));
    }, []);

    return(
        <>
        <Header title="Liste Utilisateur" other={<button className="btn-outline-secondary btn" onClick={() => setShow(!show)}>{!show && "Ajouter" || "Fermer"}</button>}/>
        {show && 
        <>
            <InscriptionPage/>
            <br/>
            </>
        }
        <div className="clienttable">
        <table className="table table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col">#</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">\</th>

                </tr>
            </thead>
            <tbody>
            {users.map(users =>
            <tr key={users.id}>
                <th scope="row">{users.id}</th>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.email}</td>
                <td>{users.roles}</td>
                <td><button className="btn-danger">X</button></td>
            </tr>)}
            </tbody>
        </table>
        </div>
        </>
    )
}
export default UserList;