import React, {useEffect, useState} from "react";
import axios from 'axios';
import Header from "./Header";

const UserList = props => {


    return(
        <>
        <Header title="Liste Unité de soin"/>
        <div className="clienttable">
        <table className="table table-hover">
            <thead className="table-dark">
                <tr>
                <th scope="col">Identifiant</th>
                    <th scope="col">Unité</th>
                    <th scope="col">Nom</th>
                    <th scope="col">\</th>

                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td><button className="btn btn-danger">X</button></td>
            </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}
export default UserList;