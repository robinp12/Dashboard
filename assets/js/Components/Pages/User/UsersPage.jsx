import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "../../Forms/Select";
import Header from "../../Header";
import DeletePopup from "../../PopupDelete";
import authAPI from "../../Services/authAPI";
import usersAPI from "../../Services/usersAPI";
import AddUser from "./AddUser";

const UsersPage = (props) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await usersAPI.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log(error.response);
      toast(error + "", {
        className: "bg-red",
      });
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleChange = async (id, e) => {
    const { value } = e.currentTarget;
    console.log(id, value, users)
    try {
      const rep = await usersAPI.update(id, value, users);
      if (authAPI.getCurrent().id == id && value == "USER") {
        setTimeout(() => {
          authAPI.logout();
          window.location.replace("/");
        }, 300);
      }
      toast("Role de l'utilisateur n°" + id + " modifié");
    } catch (error) {
      toast(error + "", {
        className: "bg-red",
      });
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const originUsers = [...users];
    setUsers(users.filter((users) => users.id !== id));

    try {
      await usersAPI.deleteUsers(id);
      toast("Utilisateur n°" + id + " supprimé", {
        className: "bg-red",
      });
    } catch (error) {
      setUsers(originUsers);
      toast(error + "", {
        className: "bg-red",
      });
    }
  };

  return (
    <>
      {authAPI.isAdmin() && (
        <>
          <Header
            title="Gestion des utilisateurs"
            right={
              <button
                className="btn-outline-secondary btn"
                onClick={() => setShow(!show)}
              >
                {(!show && "Ajouter") || "Fermer"}
              </button>
            }
          />
          {show && (
            <>
              <AddUser />
              <br />
            </>
          )}
          <div className="row justify-content-center">
            <div className="listeH clienttable col-xs-12 col-sm-12 col-md-10 col-lg-8">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col" className="text-center">
                      #
                    </th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col" className="text-center">Email</th>
                    <th scope="col" className="text-center">
                      Role
                    </th>
                    {authAPI.isAdmin() && (
                      <th scope="col" className="text-center">
                        \
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.map((users, index) => (
                    <tr key={users.id}>
                      <th scope="row" className="text-center">
                        {users.id}
                      </th>
                      <td>{users.lastName}</td>
                      <td>{users.firstName}</td>
                      <td className="text-center">{users.email}</td>
                      {(users.roles == "SUPERADMIN" && (
                        <>
                          <td className="text-center">{users.roles}</td>
                          <td className="text-center"></td>
                        </>
                      )) || (
                        <>
                          <td className="text-center">
                            <Select
                              name="role"
                              value={users.role}
                              className="custom-select-sm custom-select col-lg-7"
                              onChange={(e) => handleChange(users.id, e)}
                              defaut={users.roles}
                            />
                          </td>
                          <td className="text-center">
                            {authAPI.getCurrent().roles ==
                              "SUPERADMIN" && (
                              <DeletePopup
                                deletepop={() => handleDelete(users.id)}
                              />
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UsersPage;
