//https://getbootstrap.com/docs/5.1/content/tables/
//https://getbootstrap.com/docs/5.1/components/badge/

import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderUsers = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <th scope="row">{user.name}</th>
        <td>
          {user.qualities.map((quality) => (
            <span
              key={quality._id}
              className={`badge bg-${quality.color} me-1`}
            >
              {quality.name}
            </span>
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate + "/5"}</td>
        <td>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    return (
      <>
        <span className={`badge bg-primary`}>
          <h5 className={`m-1`}>
            {number + " человек тусанет с тобой сегодня"}
          </h5>
        </span>
      </>
    );
  };

  return (
    <>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
