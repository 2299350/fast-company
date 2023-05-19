//https://getbootstrap.com/docs/5.1/content/tables/
//https://getbootstrap.com/docs/5.1/components/badge/

import React, { useState } from "react";
import api from "../api";
import User from "./user";
import SearchStatus from "./searchStarus";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const renderUsers = () => {
    return users.map((user) => (
      <User
        key={user._id}
        user={user}
        onDelete={handleDelete}
        onBookmark={() => handleBookmark(user._id)}
      />
    ));
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleBookmark = (userId) => {
    setUsers((prevState) => {
      return prevState.map((user) => {
        return user._id === userId
          ? { ...user, bookmark: !user.bookmark }
          : user;
      });
    });
  };

  return (
    <>
      <SearchStatus number={users.length} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};

export default Users;
